import {buildLeavingPath} from './leaving.js';
import siteConfig from '../../../site.config.json';

const WEBSITE_REPOSITORY_URL = `https://github.com/${siteConfig.websiteRepository}`;
const DOCS_REPOSITORY_URL = `https://github.com/${siteConfig.documentationRepository}`;
const DOCS_URL = siteConfig.documentationUrl;

function ActionButton({children, href, icon, ...props}) {
    return (
        <md-filled-tonal-button type="link" href={href} {...props}>
            {icon ? <md-icon slot="icon" aria-hidden="true">{icon}</md-icon> : null}
            {children}
        </md-filled-tonal-button>
    );
}

function HomePage() {
    return (
        <>
            <p className="page-body">欢迎来到 <code>VRCLearn</code>！你将在这里学会 <code>VRChat 改模</code> 从基础到进阶。</p>
            <div className="card card--emphasis">
                <h2 className="card__title">快速开始</h2>
                <p>如果你已经阅读过本页内容，你可以从以下入口快速开始学习或参与项目建设：</p>
                <div className="card__actions" aria-label="快速入口">
                    <ActionButton href="/docs">立即开始学习</ActionButton>
                    <ActionButton href="/community">加入社区</ActionButton>
                    <ActionButton href="/feedback">提交反馈</ActionButton>
                </div>
            </div>
            <div className="card">
                <h2 className="card__title">引言</h2>
                <p>这里是 <code>VRCLearn</code>。在游玩 <code>VRChat</code> 的过程中，你是否常想对使用的虚拟形象进行修改？是否希望定制属于自己的虚拟形象？</p>
                <p>想要制作或修改虚拟形象，就要学习 <code>改模</code> 。然而，在学习的过程中，你可能会遇到一些困难，包括但不限于难以找到合适的教程，教程内容晦涩难懂，教程过于古老，内容已经过时……</p>
                <p>抑或，你是已经对 <code>改模</code> 有所了解的玩家。但在 <code>改模</code> 的过程中，有时遇到一些难以解决的问题，或者是缺少一些实用的软件包，再或者是安装一些插件时遇到问题，教程看不懂……</p>
                <p>此项目便旨在解决这些问题，带领你以轻松的方式走入 <code>改模</code> 的世界!</p>
            </div>
            <h2>内容说明</h2>
            <p>本项目分为多个 <code>部分</code> ：</p>
            <ul>
                <li><strong>视频教程</strong>：通过视频形式展示改模过程，帮助学习者更直观地理解操作步骤和技巧。</li>
                <li><strong>资源下载</strong>：提供改模相关的基本资源，包括 Unity 安装包，改模所需软件包列表等。</li>
                <li><strong>教程文档</strong>：系统化的改模教程，涵盖从基础到进阶的内容，适合不同阶段的学习者。</li>
                <li><strong>关于项目</strong>：介绍项目维护信息、贡献方式，鸣谢项目的参与者和赞助者。</li>
                <li><strong>加入社区</strong>：提供社区入口，方便学习交流、问题讨论和内容共建。</li>
                <li><strong>提交反馈</strong>：集中收集问题报告、体验建议与内容勘误，帮助项目持续改进。</li>
            </ul>
            <div className="card card--emphasis">
                <p>你可以根据自己的需求从本项目的任何 <code>部分</code> 开始。但在此之前，希望你能继续将本页面看完。</p>
            </div>
            <div className="card">
                <h2 className="card__title">声明</h2>
                <ul>
                    <li>本项目中的所有内容均为原创，禁止任何形式的抄袭，转载请注明出处。</li>
                    <li>本项目的教程中含有大量 <code>Unity</code> 相关内容，但本项目并非专业 <code>Unity</code> 教程，而是 <code>VRChat 改模</code> 教程</li>
                    <li>VRChat SDK、Unity、插件和平台规则可能更新，教程会尽量维护，但实际操作应以官方文档、当前版本说明和工具提示为准。</li>
                    <li>若本项目视频教程内容与教程文档不同，以教程文档为准。</li>
                </ul>
            </div>
            <div className="card card--emphasis">
                <h2 className="card__title">注意事项</h2>
                <ol>
                    <li>即使已经有一定改模基础，也建议从头阅读 <code>教程文档</code> 以验证自己的改模方式与流程是否规范和优雅。</li>
                    <li>在浏览本项目的过程中，留意像这样的 <code>提示框</code> ，其中往往含有重要信息。</li>
                    <li>有任何改模问题，都可以通过加入我们的 <code>社区</code> 来寻求帮助</li>
                    <li>对于本项目中存在的问题，可以通过 <code>提交反馈</code> 或 <code>GitHub Issues</code> 向我们提交信息，为本项目做出贡献。</li>
                </ol>
            </div>
        </>
    );
}

const videoPageLinks = {
    youtube: 'https://youtube.com/playlist?list=PL0WsDQy2rq_snqVOD_Khvsrn_057QiDba&si=Xr8C9WbJpFi2a2Gk',
    bilibili: 'https://space.bilibili.com/1041276876',
    backup: 'https://vrchat-data.cqmhv.com/video'
};

function VideoPage() {
    return (
        <>
            <p className="page-body">本页提供 <code>改模</code> 教程视频的观看，根据你的网络环境选择合适的 <code>视频入口</code> 。</p>
            <div className="card card--warning" role="alert" aria-label="项目维护警告">
                <h2 className="card__title">项目维护中</h2>
                <p>教程视频内容正在整理和维护，部分入口的视频可能暂时不完整或不可用。请优先参考教程文档中的最新说明。</p>
            </div>
            <div className="card card--emphasis">
                <h2 className="card__title">视频入口</h2>
                <p> <code>优先</code> 使用 <code>YouTube</code> 观看。如无法访问，可尝试使用 <code>VRChat Data Hub</code> 或 <code>Bilibili</code> 。</p>
                <div className="card__actions" aria-label="视频入口导航">
                    <ActionButton href="#video-youtube" icon="smart_display">YouTube 观看</ActionButton>
                    <ActionButton href="#video-backup" icon="video_library">VRChat Data Hub 观看</ActionButton>
                    <ActionButton href="#video-bilibili" icon="live_tv">Bilibili 观看</ActionButton>
                </div>
            </div>
            <div className="card" id="video-youtube">
                <h2 className="card__title">YouTube 观看</h2>
                <p> <code>优先</code> 选择此方式，前往 <code>YouTube</code> 观看教程，为我们提供收益以支持我们的项目。</p>
                <div className="card__actions" aria-label="Youtube 观看入口">
                    <ActionButton href={buildLeavingPath(videoPageLinks.youtube, 'YouTube 观看')} icon="open_in_new">YouTube 观看</ActionButton>
                </div>
            </div>
            <div className="card" id="video-backup">
                <h2 className="card__title">VRChat Data Hub 观看</h2>
                <p><code>VRChat Data Hub</code> 提供的备用视频入口，适合不能访问 <code>YouTube</code> 的情况下使用。</p>
                <div className="card__actions" aria-label="VRChat Data Hub 观看入口">
                    <ActionButton href={buildLeavingPath(videoPageLinks.backup, 'VRChat Data Hub 观看')} icon="open_in_new">VRChat Data Hub 观看</ActionButton>
                </div>
            </div>
            <div className="card" id="video-bilibili">
                <h2 className="card__title">Bilibili 观看</h2>
                <p>前往 <code>Bilibili</code> 查看可用的教程视频内容。</p>
                <div className="card__actions" aria-label="Bilibili 观看入口">
                    <ActionButton href={buildLeavingPath(videoPageLinks.bilibili, 'Bilibili 观看')} icon="open_in_new">Bilibili 观看</ActionButton>
                </div>
            </div>
        </>
    );
}

const downloadPageLinks = {
    unityHub: 'https://unity.com/cn/download',
    unityEditor: 'https://unity.com/cn/releases/editor/whats-new/2022.3.22f1',
    alcomd3: 'https://alcomd3.cqmhv.com',
    mobileCloud: 'https://yun.139.com/shareweb/#/w/i/2v3EvKXnsxpdi',
    baiduNetdisk: 'https://pan.baidu.com/s/5Ob6vLSWbwGcGLQC2aLWIpw',
    backup: 'https://vrchat-data.cqmhv.com/unity'
};

function DownloadPage() {
    return (
        <>
            <p className="page-body">本页提供 <code>改模</code> 必备资源的下载，根据你的网络环境选择合适的 <code>下载入口</code> 。</p>
            <div className="card card--emphasis">
                <h2 className="card__title">下载入口</h2>
                <p> <code>优先</code> 使用 <code>官网下载</code> 。如访问不稳定，可根据实际网络情况尝试 <code>网盘下载</code> 或 <code>备用下载</code> 。</p>
                <div className="card__actions" aria-label="下载方式导航">
                    <ActionButton href="#download-official" icon="travel_explore">官网下载</ActionButton>
                    <ActionButton href="#download-network-disk" icon="cloud_download">网盘下载</ActionButton>
                    <ActionButton href="#download-backup" icon="download">备用下载</ActionButton>
                </div>
            </div>
            <div className="card" id="download-official">
                <h2 className="card__title">官网下载</h2>
                <p> <code>优先</code> 选择此方式，前往官方站点获取 Unity 编辑器与 ALCOMD3，适合能够稳定访问官网的环境。</p>
                <div className="card__actions" aria-label="官网下载入口">
                    <ActionButton href={buildLeavingPath(downloadPageLinks.unityHub, 'Unity Hub 下载')} icon="open_in_new">Unity Hub 下载</ActionButton>
                    <ActionButton href={buildLeavingPath(downloadPageLinks.unityEditor, 'Unity 2022.3.22f1 下载')} icon="open_in_new">Unity 2022.3.22f1 下载</ActionButton>
                    <ActionButton href={buildLeavingPath(downloadPageLinks.alcomd3, 'ALCOMD3 官网')} icon="open_in_new">ALCOMD3 官网</ActionButton>
                </div>
            </div>
            <div className="card" id="download-network-disk">
                <h2 className="card__title">网盘下载</h2>
                <p>通过网盘镜像获取资源，适合官网访问不稳定或下载速度较慢的情况。</p>
                <div className="card__actions" aria-label="网盘下载入口">
                    <ActionButton href={buildLeavingPath(downloadPageLinks.mobileCloud, '移动云盘 下载')} icon="open_in_new">移动云盘 下载</ActionButton>
                    <ActionButton href={buildLeavingPath(downloadPageLinks.baiduNetdisk, '百度网盘 下载')} icon="open_in_new">百度网盘 下载</ActionButton>
                </div>
            </div>
            <div className="card" id="download-backup">
                <h2 className="card__title">备用下载</h2>
                <p>最终备用下载源，仅适合在前两种方式不可用时使用。</p>
                <div className="card__actions" aria-label="备用下载">
                    <ActionButton href={downloadPageLinks.backup} icon="download">备用下载</ActionButton>
                </div>
            </div>
        </>
    );
}

function DocsPage() {
    return (
        <>
            <p className="page-body">这里是 VRCLearn 主站的教程文档入口。文档内容由独立文档站维护，本页不会在主站内加载或复制文档。</p>
            <div className="card card--emphasis">
                <h2 className="card__title">进入文档站</h2>
                <p>点击下方按钮前往 VRCLearn Docs，阅读 Avatar、World 与其他 VRCLearn 项目的文档。</p>
                <div className="card__actions" aria-label="教程文档入口">
                    <ActionButton href={DOCS_URL} data-direct-link="1" icon="open_in_new">进入文档站</ActionButton>
                </div>
            </div>
        </>
    );
}

const communityPageLinks = {
    tencentChannel: 'https://pd.qq.com/s/6c2fkldw6',
    discord: 'https://discord.gg/aajRjanwGp',
    feedback: '/feedback'
};

function CommunityPage() {
    return (
        <>
            <p className="page-body">这里是 <code>VRCLearn</code> 的社区入口。你可以在社区中交流学习进度、提出改模问题、讨论教程内容，或参与项目建设。</p>
            <div className="card card--emphasis">
                <h2 className="card__title">加入社区</h2>
                <p>根据你的使用习惯选择平台加入。外部社区链接会先进入离站确认页，确认目标地址后再继续访问。</p>
                <div className="card__actions" aria-label="社区入口">
                    <ActionButton href={buildLeavingPath(communityPageLinks.tencentChannel, '腾讯频道 VRCLearn')} icon="forum">腾讯频道</ActionButton>
                    <ActionButton href={buildLeavingPath(communityPageLinks.discord, 'VRCLearn Discord')} icon="forum">Discord</ActionButton>
                </div>
            </div>
            <div className="card">
                <h2 className="card__title">提问建议</h2>
                <ul>
                    <li>说明你正在做什么、遇到了什么现象，以及你期望的结果。</li>
                    <li>附上截图、报错文本、Unity 版本、VRChat SDK 版本和相关插件版本。</li>
                    <li>如果问题来自教程步骤，请附上对应页面或小节，方便定位内容。</li>
                    <li>避免公开发送账号、授权密钥、付费资源文件或未经授权的模型下载链接。</li>
                </ul>
            </div>
            <div className="card">
                <h2 className="card__title">反馈与勘误</h2>
                <p>如果你发现网站问题、教程错误、链接失效或资源缺失，请优先通过提交反馈页进入 GitHub Issues，方便维护者追踪处理进度。</p>
                <div className="card__actions" aria-label="反馈入口">
                    <ActionButton href={communityPageLinks.feedback} icon="feedback">提交反馈</ActionButton>
                </div>
            </div>
        </>
    );
}

const aboutPageLinks = {
    websiteRepository: WEBSITE_REPOSITORY_URL,
    docsRepository: DOCS_REPOSITORY_URL
};

function AboutPage() {
    return (
        <>
            <p className="page-body"><code>VRCLearn</code> 是面向 VRChat Avatar 改模学习者的多语言学习项目，提供教程文档、视频入口和相关资源整理。</p>
            <div className="card">
                <h2 className="card__title">维护信息</h2>
                <p>项目名称：<code>VRCLearn</code></p>
                <p>维护者：<code>CQMHV才倾梦华V</code></p>
                <p>网站源码与教程文档分别维护。若你希望参与建设，可以通过 GitHub 提交 Issue、Pull Request，或先前往社区沟通内容方向。</p>
                <div className="card__actions" aria-label="项目仓库入口">
                    <ActionButton href={buildLeavingPath(aboutPageLinks.websiteRepository, 'VRCLearn 网站仓库')} icon="open_in_new">网站仓库</ActionButton>
                    <ActionButton href={buildLeavingPath(aboutPageLinks.docsRepository, 'VRCLearn 文档仓库')} icon="open_in_new">文档仓库</ActionButton>
                </div>
            </div>
            <div className="card">
                <h2 className="card__title">贡献方式</h2>
                <ul>
                    <li>反馈教程中的错误、过时内容、链接失效或表述不清。</li>
                    <li>补充新手常见问题、工具安装经验、版本差异说明和复现步骤。</li>
                    <li>改进网站体验，例如页面结构、可访问性、移动端阅读和导航逻辑。</li>
                    <li>提交 Pull Request 前，请尽量保持内容准确、结构清晰，并遵循项目开发规范。</li>
                </ul>
            </div>
            <div className="card">
                <h2 className="card__title">鸣谢</h2>
                <p>感谢所有参与讨论、提出反馈、贡献内容和支持项目维护的人。</p>
                <p>赞助者与贡献者名单区域暂时留空，后续会在名单整理完成后补充。</p>
            </div>
        </>
    );
}

const feedbackPageLinks = {
    issues: `${WEBSITE_REPOSITORY_URL}/issues`,
    newIssue: `${WEBSITE_REPOSITORY_URL}/issues/new`
};

function FeedbackPage() {
    return (
        <>
            <p className="page-body">目前 <code>VRCLearn</code> 统一通过 <code>GitHub Issues</code> 收集网站问题、教程勘误、资源失效和改进建议。</p>
            <div className="card card--emphasis">
                <h2 className="card__title">反馈入口</h2>
                <p>如果你发现内容错误、页面异常、链接失效，或有新的教程建议，请通过 GitHub Issues 提交。公开 Issue 更便于维护者追踪处理进度，也方便其他学习者补充信息。</p>
                <div className="card__actions" aria-label="GitHub Issues 入口">
                    <ActionButton href={buildLeavingPath(feedbackPageLinks.newIssue, '新建 GitHub Issue')} icon="add_comment">新建 Issue</ActionButton>
                    <ActionButton href={buildLeavingPath(feedbackPageLinks.issues, '查看 GitHub Issues')} icon="open_in_new">查看 Issues</ActionButton>
                </div>
            </div>
            <div className="card">
                <h2 className="card__title">适合提交的内容</h2>
                <ul>
                    <li>教程内容有误、表述不清、步骤缺失或与当前工具版本不一致。</li>
                    <li>页面排版、导航、主题切换、移动端显示或访问体验存在问题。</li>
                    <li>下载入口、外部链接、图片或文档目录无法正常打开。</li>
                    <li>希望补充某个改模主题、常见问题、工具说明或排错流程。</li>
                </ul>
            </div>
            <div className="card">
                <h2 className="card__title">提交前请尽量包含</h2>
                <ul>
                    <li>问题所在页面或文档位置，最好附上链接。</li>
                    <li>你看到的现象、期望结果，以及可以复现的操作步骤。</li>
                    <li>相关截图、报错文本、浏览器版本、Unity 版本、VRChat SDK 版本或插件版本。</li>
                    <li>如果是教程建议，请说明目标读者、使用场景和你希望解决的具体问题。</li>
                </ul>
            </div>
            <div className="card">
                <h2 className="card__title">不建议提交到公开 Issue 的内容</h2>
                <ul>
                    <li>账号、邮箱、手机号、群聊记录、授权密钥等隐私或敏感信息。</li>
                    <li>未经授权分发的模型、插件、付费资源或下载链接。</li>
                    <li>只有个人环境可见、且没有复现信息的问题描述。</li>
                </ul>
            </div>
        </>
    );
}

function getSafeExternalUrl(rawUrl) {
    try {
        const url = new URL(rawUrl);
        return url.protocol === 'http:' || url.protocol === 'https:' ? url.href : '';
    } catch {
        return '';
    }
}

function getSafeReturnPath(rawPath) {
    if (!rawPath) {
        return '/home';
    }

    try {
        const url = new URL(rawPath, window.location.origin);
        if (url.origin !== window.location.origin || url.pathname === '/leaving') {
            return '/home';
        }
        return `${url.pathname}${url.search}${url.hash}`;
    } catch {
        return '/home';
    }
}

function LeavingPage() {
    const params = new URLSearchParams(window.location.search);
    const targetUrl = getSafeExternalUrl(params.get('url') || '');
    const label = params.get('label') || '外部页面';
    const returnPath = getSafeReturnPath(params.get('from') || '');

    if (!targetUrl) {
        return (
            <>
                <p className="page-body">未找到有效的外部链接。你可以返回上一页重新选择入口。</p>
                <div className="card__actions" aria-label="离站操作">
                    <ActionButton href={returnPath} icon="arrow_back">返回上一页</ActionButton>
                </div>
            </>
        );
    }

    return (
        <>
            <p className="page-body">你正在打开外部链接：{label}。该链接将离开 <code>VRCLearn</code> 网站，请确认目标地址可信后继续访问。</p>
            <div className="card">
                <h2 className="card__title">目标地址</h2>
                <p><code>{targetUrl}</code></p>
                <div className="card__actions" aria-label="离站操作">
                    <ActionButton href={targetUrl} target="_blank" rel="noopener" icon="open_in_new">继续访问</ActionButton>
                    <ActionButton href={returnPath} icon="arrow_back">返回上一页</ActionButton>
                </div>
            </div>
        </>
    );
}

export const staticPages = {
    home: {
        title: '首页',
        component: HomePage
    },
    video: {
        title: '教程视频',
        component: VideoPage
    },
    download: {
        title: '资源下载',
        component: DownloadPage
    },
    docs: {
        title: '教程文档',
        component: DocsPage
    },
    leaving: {
        title: '你即将离开此网站',
        component: LeavingPage
    },
    community: {
        title: '加入社区',
        component: CommunityPage
    },
    about: {
        title: '关于项目',
        component: AboutPage
    },
    feedback: {
        title: '提交反馈',
        component: FeedbackPage
    }
};
