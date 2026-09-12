import {Fragment} from 'react';
import {getLocalizedContent} from '../i18n/content.js';
import {buildLeavingPath} from './leaving.js';
import siteConfig from '../../../site.config.json';

const WEBSITE_REPOSITORY_URL = `https://github.com/${siteConfig.websiteRepository}`;
const DOCS_REPOSITORY_URL = `https://github.com/${siteConfig.documentationRepository}`;
const DOCS_URL = siteConfig.documentationUrl;

function RichText({text}) {
    return String(text).split(/(`[^`]+`)/g).filter(Boolean).map((part, index) => (
        part.startsWith('`') && part.endsWith('`')
            ? <code key={index}>{part.slice(1, -1)}</code>
            : <Fragment key={index}>{part}</Fragment>
    ));
}

function TextList({items, ordered = false}) {
    const List = ordered ? 'ol' : 'ul';
    return (
        <List>
            {items.map((item, index) => <li key={index}><RichText text={item} /></li>)}
        </List>
    );
}

function LabeledList({items, separator}) {
    return (
        <ul>
            {items.map(([label, text]) => (
                <li key={label}><strong>{label}</strong>{separator}{text}</li>
            ))}
        </ul>
    );
}

function ActionButton({children, href, icon, ...props}) {
    return (
        <md-filled-tonal-button type="link" href={href} {...props}>
            {icon ? <md-icon slot="icon" aria-hidden="true">{icon}</md-icon> : null}
            {children}
        </md-filled-tonal-button>
    );
}

function HomePage({route}) {
    const content = getLocalizedContent(route.lang);
    const copy = content.pages.home;
    return (
        <>
            <p className="page-body"><RichText text={copy.lead} /></p>
            <div className="card card--emphasis">
                <h2 className="card__title">{copy.quickTitle}</h2>
                <p>{copy.quickBody}</p>
                <div className="card__actions" aria-label={copy.quickLabel}>
                    <ActionButton href="/docs">{copy.startLearning}</ActionButton>
                    <ActionButton href="/community">{copy.joinCommunity}</ActionButton>
                    <ActionButton href="/feedback">{copy.submitFeedback}</ActionButton>
                </div>
            </div>
            <div className="card">
                <h2 className="card__title">{copy.introTitle}</h2>
                {copy.intro.map((paragraph, index) => <p key={index}><RichText text={paragraph} /></p>)}
            </div>
            <h2>{copy.overviewTitle}</h2>
            <p><RichText text={copy.overviewLead} /></p>
            <LabeledList items={copy.overview} separator={content.punctuation.label} />
            <div className="card card--emphasis">
                <p><RichText text={copy.continue} /></p>
            </div>
            <div className="card">
                <h2 className="card__title">{copy.declarationTitle}</h2>
                <TextList items={copy.declaration} />
            </div>
            <div className="card card--emphasis">
                <h2 className="card__title">{copy.notesTitle}</h2>
                <TextList items={copy.notes} ordered />
            </div>
        </>
    );
}

const videoPageLinks = {
    youtube: 'https://youtube.com/playlist?list=PL0WsDQy2rq_snqVOD_Khvsrn_057QiDba&si=Xr8C9WbJpFi2a2Gk',
    bilibili: 'https://space.bilibili.com/1041276876',
    backup: 'https://vrchat-data.cqmhv.com/video'
};

function VideoPage({route}) {
    const copy = getLocalizedContent(route.lang).pages.video;
    const sources = [
        ['video-youtube', copy.youtube, copy.youtubeBody, videoPageLinks.youtube],
        ['video-backup', copy.backup, copy.backupBody, videoPageLinks.backup],
        ['video-bilibili', copy.bilibili, copy.bilibiliBody, videoPageLinks.bilibili]
    ];
    return (
        <>
            <p className="page-body"><RichText text={copy.lead} /></p>
            <div className="card card--warning" role="alert" aria-label={copy.maintenanceLabel}>
                <h2 className="card__title">{copy.maintenanceTitle}</h2>
                <p>{copy.maintenanceBody}</p>
            </div>
            <div className="card card--emphasis">
                <h2 className="card__title">{copy.entryTitle}</h2>
                <p><RichText text={copy.entryBody} /></p>
                <div className="card__actions" aria-label={copy.entryLabel}>
                    <ActionButton href="#video-youtube" icon="smart_display">{copy.youtube}</ActionButton>
                    <ActionButton href="#video-backup" icon="video_library">{copy.backup}</ActionButton>
                    <ActionButton href="#video-bilibili" icon="live_tv">{copy.bilibili}</ActionButton>
                </div>
            </div>
            {sources.map(([id, label, body, url]) => (
                <div className="card" id={id} key={id}>
                    <h2 className="card__title">{label}</h2>
                    <p><RichText text={body} /></p>
                    <div className="card__actions" aria-label={label}>
                        <ActionButton href={buildLeavingPath(url, label)} icon="open_in_new">{label}</ActionButton>
                    </div>
                </div>
            ))}
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

function DownloadPage({route}) {
    const copy = getLocalizedContent(route.lang).pages.download;
    return (
        <>
            <p className="page-body"><RichText text={copy.lead} /></p>
            <div className="card card--emphasis">
                <h2 className="card__title">{copy.entryTitle}</h2>
                <p><RichText text={copy.entryBody} /></p>
                <div className="card__actions" aria-label={copy.entryLabel}>
                    <ActionButton href="#download-official" icon="travel_explore">{copy.official}</ActionButton>
                    <ActionButton href="#download-network-disk" icon="cloud_download">{copy.networkDisk}</ActionButton>
                    <ActionButton href="#download-backup" icon="download">{copy.backup}</ActionButton>
                </div>
            </div>
            <div className="card" id="download-official">
                <h2 className="card__title">{copy.official}</h2>
                <p>{copy.officialBody}</p>
                <div className="card__actions" aria-label={copy.officialLabel}>
                    <ActionButton href={buildLeavingPath(downloadPageLinks.unityHub, copy.unityHub)} icon="open_in_new">{copy.unityHub}</ActionButton>
                    <ActionButton href={buildLeavingPath(downloadPageLinks.unityEditor, copy.unityEditor)} icon="open_in_new">{copy.unityEditor}</ActionButton>
                    <ActionButton href={buildLeavingPath(downloadPageLinks.alcomd3, copy.alcomd3)} icon="open_in_new">{copy.alcomd3}</ActionButton>
                </div>
            </div>
            <div className="card" id="download-network-disk">
                <h2 className="card__title">{copy.networkDisk}</h2>
                <p>{copy.networkDiskBody}</p>
                <div className="card__actions" aria-label={copy.networkDiskLabel}>
                    <ActionButton href={buildLeavingPath(downloadPageLinks.mobileCloud, copy.mobileCloud)} icon="open_in_new">{copy.mobileCloud}</ActionButton>
                    <ActionButton href={buildLeavingPath(downloadPageLinks.baiduNetdisk, copy.baiduNetdisk)} icon="open_in_new">{copy.baiduNetdisk}</ActionButton>
                </div>
            </div>
            <div className="card" id="download-backup">
                <h2 className="card__title">{copy.backup}</h2>
                <p>{copy.backupBody}</p>
                <div className="card__actions" aria-label={copy.backupLabel}>
                    <ActionButton href={downloadPageLinks.backup} icon="download">{copy.backup}</ActionButton>
                </div>
            </div>
        </>
    );
}

function DocsPage({route}) {
    const copy = getLocalizedContent(route.lang).pages.docs;
    return (
        <>
            <p className="page-body">{copy.lead}</p>
            <div className="card card--emphasis">
                <h2 className="card__title">{copy.title}</h2>
                <p>{copy.body}</p>
                <div className="card__actions" aria-label={copy.label}>
                    <ActionButton href={DOCS_URL} icon="open_in_new">{copy.action}</ActionButton>
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

function CommunityPage({route}) {
    const copy = getLocalizedContent(route.lang).pages.community;
    return (
        <>
            <p className="page-body"><RichText text={copy.lead} /></p>
            <div className="card card--emphasis">
                <h2 className="card__title">{copy.joinTitle}</h2>
                <p>{copy.joinBody}</p>
                <div className="card__actions" aria-label={copy.joinLabel}>
                    <ActionButton href={buildLeavingPath(communityPageLinks.tencentChannel, `VRCLearn ${copy.tencent}`)} icon="forum">{copy.tencent}</ActionButton>
                    <ActionButton href={buildLeavingPath(communityPageLinks.discord, 'VRCLearn Discord')} icon="forum">{copy.discord}</ActionButton>
                </div>
            </div>
            <div className="card">
                <h2 className="card__title">{copy.adviceTitle}</h2>
                <TextList items={copy.advice} />
            </div>
            <div className="card">
                <h2 className="card__title">{copy.feedbackTitle}</h2>
                <p>{copy.feedbackBody}</p>
                <div className="card__actions" aria-label={copy.feedbackLabel}>
                    <ActionButton href={communityPageLinks.feedback} icon="feedback">{copy.feedbackAction}</ActionButton>
                </div>
            </div>
        </>
    );
}

const aboutPageLinks = {
    websiteRepository: WEBSITE_REPOSITORY_URL,
    docsRepository: DOCS_REPOSITORY_URL
};

function AboutPage({route}) {
    const content = getLocalizedContent(route.lang);
    const copy = content.pages.about;
    return (
        <>
            <p className="page-body"><RichText text={copy.lead} /></p>
            <div className="card">
                <h2 className="card__title">{copy.maintenanceTitle}</h2>
                <p>{copy.productName}{content.punctuation.label}<code>VRCLearn</code></p>
                <p>{copy.maintainer}{content.punctuation.label}<code>CQMHV才倾梦华V</code></p>
                <p>{copy.maintenanceBody}</p>
                <div className="card__actions" aria-label={copy.repositoriesLabel}>
                    <ActionButton href={buildLeavingPath(aboutPageLinks.websiteRepository, copy.websiteRepository)} icon="open_in_new">{copy.websiteRepository}</ActionButton>
                    <ActionButton href={buildLeavingPath(aboutPageLinks.docsRepository, copy.docsRepository)} icon="open_in_new">{copy.docsRepository}</ActionButton>
                </div>
            </div>
            <div className="card">
                <h2 className="card__title">{copy.contributeTitle}</h2>
                <TextList items={copy.contribute} />
            </div>
            <div className="card">
                <h2 className="card__title">{copy.thanksTitle}</h2>
                {copy.thanks.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
            </div>
        </>
    );
}

const feedbackPageLinks = {
    issues: `${WEBSITE_REPOSITORY_URL}/issues`,
    newIssue: `${WEBSITE_REPOSITORY_URL}/issues/new`
};

function FeedbackPage({route}) {
    const copy = getLocalizedContent(route.lang).pages.feedback;
    const sections = [
        [copy.suitableTitle, copy.suitable],
        [copy.includeTitle, copy.include],
        [copy.avoidTitle, copy.avoid]
    ];
    return (
        <>
            <p className="page-body"><RichText text={copy.lead} /></p>
            <div className="card card--emphasis">
                <h2 className="card__title">{copy.entryTitle}</h2>
                <p>{copy.entryBody}</p>
                <div className="card__actions" aria-label={copy.entryLabel}>
                    <ActionButton href={buildLeavingPath(feedbackPageLinks.newIssue, copy.newIssue)} icon="add_comment">{copy.newIssue}</ActionButton>
                    <ActionButton href={buildLeavingPath(feedbackPageLinks.issues, copy.viewIssues)} icon="open_in_new">{copy.viewIssues}</ActionButton>
                </div>
            </div>
            {sections.map(([title, items]) => (
                <div className="card" key={title}>
                    <h2 className="card__title">{title}</h2>
                    <TextList items={items} />
                </div>
            ))}
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

function LeavingPage({route}) {
    const content = getLocalizedContent(route.lang);
    const copy = content.pages.leaving;
    const params = new URLSearchParams(window.location.search);
    const targetUrl = getSafeExternalUrl(params.get('url') || '');
    const label = params.get('label') || content.shell.externalPage;
    const returnPath = getSafeReturnPath(params.get('from') || '');

    if (!targetUrl) {
        return (
            <>
                <p className="page-body">{copy.invalid}</p>
                <div className="card__actions" aria-label={copy.actionsLabel}>
                    <ActionButton href={returnPath} icon="arrow_back">{copy.back}</ActionButton>
                </div>
            </>
        );
    }

    return (
        <>
            <p className="page-body">{copy.bodyPrefix} {label}{content.punctuation.sentence}<RichText text={copy.bodySuffix} /></p>
            <div className="card">
                <h2 className="card__title">{copy.targetTitle}</h2>
                <p><code>{targetUrl}</code></p>
                <div className="card__actions" aria-label={copy.actionsLabel}>
                    <ActionButton href={targetUrl} target="_blank" rel="noopener" icon="open_in_new">{copy.continue}</ActionButton>
                    <ActionButton href={returnPath} icon="arrow_back">{copy.back}</ActionButton>
                </div>
            </div>
        </>
    );
}

export const staticPages = {
    home: {component: HomePage},
    video: {component: VideoPage},
    download: {component: DownloadPage},
    docs: {component: DocsPage},
    leaving: {component: LeavingPage},
    community: {component: CommunityPage},
    about: {component: AboutPage},
    feedback: {component: FeedbackPage}
};
