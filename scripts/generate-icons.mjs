import {Resvg} from '@resvg/resvg-js';
import {readFile, writeFile} from 'node:fs/promises';
import {basename, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const ROOT_DIRECTORY = fileURLToPath(new URL('..', import.meta.url));
const PUBLIC_DIRECTORY = join(ROOT_DIRECTORY, 'public');
const SOURCE_LOGO_PATH = join(PUBLIC_DIRECTORY, 'favicon.svg');
const ICON_CANVAS_SIZE = 512;
const ICON_CANVAS_BACKGROUND_COLOR = '#ffffff';
const MASKABLE_SAFE_ZONE_DIAMETER_RATIO = 0.8;
const MASKABLE_SAFE_ZONE_MARGIN = 4;

const SVG_VARIANTS = [
    {
        output: 'pwa-icon.svg',
        title: 'VRCLearn App Icon',
        logoWidth: 392,
        backgroundRadius: 112
    },
    {
        output: 'pwa-icon-maskable.svg',
        title: 'VRCLearn Maskable App Icon',
        fitWithinMaskableSafeZone: true,
        backgroundRadius: 0
    }
];

const PNG_VARIANTS = [
    {
        source: 'pwa-icon-maskable.svg',
        output: 'apple-touch-icon.png',
        size: 180
    },
    {
        source: 'pwa-icon.svg',
        output: 'pwa-icon-192.png',
        size: 192
    },
    {
        source: 'pwa-icon.svg',
        output: 'pwa-icon-512.png',
        size: 512
    },
    {
        source: 'pwa-icon-maskable.svg',
        output: 'pwa-icon-maskable-192.png',
        size: 192
    },
    {
        source: 'pwa-icon-maskable.svg',
        output: 'pwa-icon-maskable-512.png',
        size: 512
    }
];

const FORBIDDEN_SOURCE_PATTERNS = [
    {pattern: /<text\b/iu, reason: '包含未转曲的 <text> 元素'},
    {pattern: /<style\b/iu, reason: '包含可遗留外部依赖的 <style> 元素'},
    {pattern: /@import\b/iu, reason: '包含 CSS @import'},
    {pattern: /\bfont(?:-family|-weight|-style|-size)?\s*[:=]/iu, reason: '包含字体属性'},
    {pattern: /\b(?:href|xlink:href)\s*=\s*["'](?:https?:)?\/\//iu, reason: '包含外部资源引用'},
    {pattern: /\burl\s*\(/iu, reason: '包含 CSS URL 引用'},
    {pattern: /<(?:script|foreignObject|image)\b/iu, reason: '包含不允许的可执行或嵌入内容'},
    {pattern: /\bon[a-z]+\s*=/iu, reason: '包含事件处理属性'}
];

function parseSvgNumber(value, label) {
    const number = Number.parseFloat(value);
    if (!Number.isFinite(number)) {
        throw new Error(`${basename(SOURCE_LOGO_PATH)} 的 ${label} 不是有效数字: ${value}`);
    }

    return number;
}

function validateOutlinedSvg(svg) {
    for (const {pattern, reason} of FORBIDDEN_SOURCE_PATTERNS) {
        if (pattern.test(svg)) {
            throw new Error(`${basename(SOURCE_LOGO_PATH)} ${reason}。图标源必须是完全转曲且自包含的 SVG。`);
        }
    }

    if (!/<path\b/iu.test(svg)) {
        throw new Error(`${basename(SOURCE_LOGO_PATH)} 不包含任何 <path> 元素。`);
    }
}

function readSourceSvg(svg) {
    validateOutlinedSvg(svg);

    const rootMatch = svg.match(/<svg\b[^>]*\bviewBox\s*=\s*(["'])(.*?)\1[^>]*>([\s\S]*?)<\/svg>\s*$/iu);
    if (!rootMatch) {
        throw new Error(`${basename(SOURCE_LOGO_PATH)} 缺少有效的 SVG 根元素或 viewBox。`);
    }

    const viewBoxValues = rootMatch[2].trim().split(/[\s,]+/u);
    if (viewBoxValues.length !== 4) {
        throw new Error(`${basename(SOURCE_LOGO_PATH)} 的 viewBox 必须包含四个数值。`);
    }

    const [minX, minY, width, height] = viewBoxValues.map((value, index) => (
        parseSvgNumber(value, `viewBox 第 ${index + 1} 项`)
    ));
    if (width <= 0 || height <= 0) {
        throw new Error(`${basename(SOURCE_LOGO_PATH)} 的 viewBox 宽高必须大于零。`);
    }

    const body = rootMatch[3]
        .replace(/<title\b[^>]*>[\s\S]*?<\/title>\s*/giu, '')
        .trim();

    return {
        body,
        viewBox: {minX, minY, width, height}
    };
}

function resolveLogoSize(viewBox, variant) {
    const aspectRatio = viewBox.height / viewBox.width;
    let logoWidth = variant.logoWidth;

    if (variant.fitWithinMaskableSafeZone) {
        const safeZoneRadius = (
            ICON_CANVAS_SIZE * MASKABLE_SAFE_ZONE_DIAMETER_RATIO / 2
        ) - MASKABLE_SAFE_ZONE_MARGIN;
        logoWidth = Math.floor((2 * safeZoneRadius) / Math.sqrt(1 + aspectRatio ** 2));
    }

    if (!Number.isFinite(logoWidth) || logoWidth <= 0) {
        throw new Error(`${variant.output} 缺少有效的图标布局宽度。`);
    }

    const logoHeight = Math.round(logoWidth * aspectRatio);
    if (variant.fitWithinMaskableSafeZone) {
        const safeZoneRadius = ICON_CANVAS_SIZE * MASKABLE_SAFE_ZONE_DIAMETER_RATIO / 2;
        const cornerDistance = Math.hypot(logoWidth / 2, logoHeight / 2);
        if (cornerDistance > safeZoneRadius) {
            throw new Error(`${variant.output} 的图形超出 maskable 安全区域。`);
        }
    }

    return {logoWidth, logoHeight};
}

function createPwaSvg({body, viewBox}, variant, backgroundColor) {
    const {logoWidth, logoHeight} = resolveLogoSize(viewBox, variant);
    const logoX = Math.round((ICON_CANVAS_SIZE - logoWidth) / 2);
    const logoY = Math.round((ICON_CANVAS_SIZE - logoHeight) / 2);

    return `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg
    width="${ICON_CANVAS_SIZE}"
    height="${ICON_CANVAS_SIZE}"
    viewBox="0 0 ${ICON_CANVAS_SIZE} ${ICON_CANVAS_SIZE}"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-labelledby="icon-title"
>
    <title id="icon-title">${variant.title}</title>
    <rect
        width="${ICON_CANVAS_SIZE}"
        height="${ICON_CANVAS_SIZE}"
        rx="${variant.backgroundRadius}"
        fill="${backgroundColor}"
    />
    <svg
        x="${logoX}"
        y="${logoY}"
        width="${logoWidth}"
        height="${logoHeight}"
        viewBox="${viewBox.minX} ${viewBox.minY} ${viewBox.width} ${viewBox.height}"
        aria-hidden="true"
    >
${body}
    </svg>
</svg>
`;
}

async function writeFileIfChanged(filePath, contents) {
    const nextContents = Buffer.isBuffer(contents) ? contents : Buffer.from(contents, 'utf8');

    try {
        const currentContents = await readFile(filePath);
        if (currentContents.equals(nextContents)) {
            return false;
        }
    } catch (error) {
        if (error.code !== 'ENOENT') {
            throw error;
        }
    }

    await writeFile(filePath, nextContents);
    return true;
}

async function generateSvgVariants(source, backgroundColor) {
    const generatedFiles = [];

    for (const variant of SVG_VARIANTS) {
        const svg = createPwaSvg(source, variant, backgroundColor);
        validateOutlinedSvg(svg);
        const outputPath = join(PUBLIC_DIRECTORY, variant.output);
        await writeFileIfChanged(outputPath, `${svg.trim()}\n`);
        generatedFiles.push(variant.output);
    }

    return generatedFiles;
}

async function generatePngVariants() {
    const generatedFiles = [];

    for (const variant of PNG_VARIANTS) {
        const sourceSvg = await readFile(join(PUBLIC_DIRECTORY, variant.source), 'utf8');
        const renderer = new Resvg(sourceSvg, {
            fitTo: {
                mode: 'width',
                value: variant.size
            }
        });
        const outputPath = join(PUBLIC_DIRECTORY, variant.output);
        await writeFileIfChanged(outputPath, renderer.render().asPng());
        generatedFiles.push(variant.output);
    }

    return generatedFiles;
}

async function main() {
    const sourceSvg = await readFile(SOURCE_LOGO_PATH, 'utf8');
    const source = readSourceSvg(sourceSvg);
    const svgFiles = await generateSvgVariants(source, ICON_CANVAS_BACKGROUND_COLOR);
    const pngFiles = await generatePngVariants();

    console.log(`[generate-icons] 已从 favicon.svg 验证并生成 ${svgFiles.concat(pngFiles).length} 个图标文件。`);
}

await main();
