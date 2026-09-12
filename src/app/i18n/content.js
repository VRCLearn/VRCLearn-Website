import siteConfig from '../../../site.config.json';
import {getCanonicalLang} from './language.js';

const CONTENT = {
    'en-US': {
        punctuation: {label: ': ', sentence: '. '},
        shell: {
            openMenu: 'Open navigation menu',
            closeMenu: 'Close navigation menu',
            github: 'Visit GitHub',
            openTheme: 'Open theme controls',
            navigation: 'Tutorial navigation',
            directory: 'Tutorial directory',
            notFoundBody: 'This path does not exist. Choose another page from the site navigation.',
            returnHome: 'Return home',
            externalPage: 'External page'
        },
        theme: {
            title: 'Theme controls',
            reset: 'Reset',
            sourceColor: 'Source color',
            chooseColor: 'Choose theme color',
            hue: 'Hue',
            chroma: 'Chroma',
            tone: 'Tone',
            scheme: 'Color scheme',
            separator: ': ',
            mode: 'Theme mode',
            light: 'Light mode',
            auto: 'Automatic mode',
            dark: 'Dark mode',
            schemes: {
                'tonal-spot': 'Tonal spot',
                'fidelity': 'Fidelity',
                'monochrome': 'Monochrome',
                'neutral': 'Neutral',
                'vibrant': 'Vibrant',
                'expressive': 'Expressive',
                'content': 'Content',
                'rainbow': 'Rainbow',
                'fruit-salad': 'Fruit salad'
            }
        },
        pages: {
            home: {
                lead: 'Welcome to `VRCLearn`! Learn `VRChat avatar customization` here, from beginner to advanced.',
                quickTitle: 'Quick start',
                quickBody: 'If you have already read this page, use these shortcuts to start learning or contribute to the project:',
                quickLabel: 'Quick links',
                startLearning: 'Start learning',
                joinCommunity: 'Join community',
                submitFeedback: 'Submit feedback',
                introTitle: 'Introduction',
                intro: [
                    'This is `VRCLearn`. While using `VRChat`, have you ever wanted to modify the avatar you use or create one that feels uniquely yours?',
                    'Creating or modifying an avatar requires learning `avatar customization`. The learning process can be difficult when suitable tutorials are hard to find, explanations are unclear, or older material is already outdated.',
                    'You may already know the basics yet still run into difficult problems, missing tools, plugin installation issues, or instructions that are hard to follow.',
                    'This project exists to address those problems and provide an approachable path into `avatar customization`.'
                ],
                overviewTitle: 'What this project includes',
                overviewLead: 'The project is organized into several `sections`:',
                overview: [
                    ['Video tutorials', 'Visual demonstrations of avatar customization workflows, steps, and techniques.'],
                    ['Downloads', 'Essential resources such as Unity installers and lists of useful packages.'],
                    ['Documentation', 'Structured guides from beginner through advanced topics.'],
                    ['About', 'Project maintenance, contribution information, contributors, and supporters.'],
                    ['Community', 'Places to discuss learning progress, questions, and shared content.'],
                    ['Feedback', 'A central place to report problems, corrections, broken resources, and suggestions.']
                ],
                continue: 'You may begin with any `section` that fits your needs. Before doing so, we recommend finishing this page.',
                declarationTitle: 'Notice',
                declaration: [
                    'All content in this project is original. Plagiarism is prohibited, and reproductions must credit the source.',
                    'The tutorials contain substantial `Unity` material, but this is a `VRChat avatar customization` project rather than a general-purpose Unity course.',
                    'VRChat SDK, Unity, plugins, and platform rules may change. We maintain the tutorials where possible, but current official documentation, release notes, and tool prompts take precedence.',
                    'If a video tutorial differs from the written documentation, follow the documentation.'
                ],
                notesTitle: 'Before you begin',
                notes: [
                    'Even if you already have experience, consider reading the `documentation` from the beginning to validate your workflow and practices.',
                    'Watch for highlighted `information cards`; they often contain important details.',
                    'For avatar customization questions, join our `community` to ask for help.',
                    'Report project problems through `Feedback` or `GitHub Issues` to help improve VRCLearn.'
                ]
            },
            video: {
                lead: 'This page provides `avatar customization` tutorial videos. Choose a `video source` that works well for your network.',
                maintenanceLabel: 'Project maintenance warning',
                maintenanceTitle: 'Under maintenance',
                maintenanceBody: 'Tutorial videos are being organized and maintained. Some sources may be incomplete or temporarily unavailable. Refer to the documentation for the latest instructions.',
                entryTitle: 'Video sources',
                entryBody: 'Use `YouTube` when possible. If it is unavailable, try `VRChat Data Hub` or `Bilibili`.',
                entryLabel: 'Video source navigation',
                youtube: 'Watch on YouTube',
                backup: 'Watch on VRChat Data Hub',
                bilibili: 'Watch on Bilibili',
                youtubeBody: 'This is the `preferred` option. Watching on `YouTube` helps generate revenue that supports the project.',
                backupBody: '`VRChat Data Hub` is a backup source for environments where `YouTube` is unavailable.',
                bilibiliBody: 'Visit `Bilibili` to view the tutorial videos currently available.'
            },
            download: {
                lead: 'Download essential `avatar customization` resources here. Choose a `download source` that works well for your network.',
                entryTitle: 'Download sources',
                entryBody: 'Prefer `official downloads`. If access is unstable, try a `cloud drive mirror` or the `backup source`.',
                entryLabel: 'Download source navigation',
                official: 'Official downloads',
                networkDisk: 'Cloud drive mirrors',
                backup: 'Backup download',
                officialBody: 'Use official sites to obtain the Unity Editor and ALCOMD3 when those sites are reliably accessible.',
                officialLabel: 'Official download links',
                unityHub: 'Download Unity Hub',
                unityEditor: 'Download Unity 2022.3.22f1',
                alcomd3: 'ALCOMD3 website',
                networkDiskBody: 'Use a cloud drive mirror when official sites are unstable or download speeds are slow.',
                networkDiskLabel: 'Cloud drive download links',
                mobileCloud: 'China Mobile Cloud',
                baiduNetdisk: 'Baidu Netdisk',
                backupBody: 'Use this final backup only when the first two methods are unavailable.',
                backupLabel: 'Backup download link'
            },
            docs: {
                lead: 'This is the documentation entry page on the VRCLearn main site. Documentation is maintained on a separate site and is not loaded or copied here.',
                title: 'Open the documentation site',
                body: 'Visit VRCLearn Docs to read documentation for Avatar, World, and other VRCLearn projects.',
                label: 'Documentation link',
                action: 'Open VRCLearn Docs'
            },
            community: {
                lead: 'This is the `VRCLearn` community hub. Discuss your progress, ask avatar customization questions, talk about tutorial content, or help build the project.',
                joinTitle: 'Join the community',
                joinBody: 'Choose the platform you prefer. External community links first open a confirmation page so you can verify the destination.',
                joinLabel: 'Community links',
                tencent: 'Tencent Channel',
                discord: 'Discord',
                adviceTitle: 'How to ask a good question',
                advice: [
                    'Explain what you are doing, what happened, and what you expected.',
                    'Include screenshots, error text, and the relevant Unity, VRChat SDK, and plugin versions.',
                    'If the issue comes from a tutorial step, include the relevant page or section.',
                    'Do not publicly share accounts, access keys, paid resource files, or unauthorized model download links.'
                ],
                feedbackTitle: 'Corrections and feedback',
                feedbackBody: 'If you find a website problem, tutorial error, broken link, or missing resource, use the Feedback page to open GitHub Issues so maintainers can track progress.',
                feedbackLabel: 'Feedback link',
                feedbackAction: 'Submit feedback'
            },
            about: {
                lead: '`VRCLearn` is a multilingual learning project for VRChat avatar customization, providing documentation, video sources, and curated resources.',
                maintenanceTitle: 'Project information',
                productName: 'Project name',
                maintainer: 'Maintainer',
                maintenanceBody: 'The website source and tutorial documentation are maintained separately. To contribute, open an Issue or Pull Request on GitHub, or discuss the direction with the community first.',
                repositoriesLabel: 'Project repository links',
                websiteRepository: 'Website repository',
                docsRepository: 'Documentation repository',
                contributeTitle: 'Ways to contribute',
                contribute: [
                    'Report incorrect, outdated, broken, or unclear tutorial content.',
                    'Add common beginner questions, installation experience, version differences, and reproduction steps.',
                    'Improve the website structure, accessibility, mobile reading experience, or navigation.',
                    'Before submitting a Pull Request, keep content accurate and well structured and follow the project guidelines.'
                ],
                thanksTitle: 'Acknowledgements',
                thanks: [
                    'Thank you to everyone who joins discussions, provides feedback, contributes content, or supports maintenance.',
                    'The sponsor and contributor list will be added after it has been compiled.'
                ]
            },
            feedback: {
                lead: '`VRCLearn` currently uses `GitHub Issues` to collect website problems, tutorial corrections, broken resources, and improvement ideas.',
                entryTitle: 'Feedback links',
                entryBody: 'If you find incorrect content, a page problem, a broken link, or have a tutorial suggestion, submit it through GitHub Issues. Public issues help maintainers track progress and allow other learners to add context.',
                entryLabel: 'GitHub Issues links',
                newIssue: 'Create an Issue',
                viewIssues: 'View Issues',
                suitableTitle: 'Good subjects for an Issue',
                suitable: [
                    'Incorrect or unclear tutorial content, missing steps, or instructions that differ from current tool versions.',
                    'Problems with page layout, navigation, theme switching, mobile display, or general access.',
                    'Download sources, external links, images, or documentation sections that cannot be opened.',
                    'Requests for an avatar customization topic, common question, tool guide, or troubleshooting workflow.'
                ],
                includeTitle: 'Please include when possible',
                include: [
                    'The affected page or documentation location, preferably with a link.',
                    'What you observed, what you expected, and reproducible steps.',
                    'Relevant screenshots, error text, browser version, Unity version, VRChat SDK version, or plugin version.',
                    'For tutorial suggestions, describe the intended audience, scenario, and specific problem to solve.'
                ],
                avoidTitle: 'Do not post publicly',
                avoid: [
                    'Accounts, email addresses, phone numbers, chat logs, access keys, or other private or sensitive information.',
                    'Unauthorized models, plugins, paid resources, or download links.',
                    'Problems visible only in a personal environment without enough information to reproduce them.'
                ]
            },
            leaving: {
                invalid: 'No valid external link was found. Return to the previous page and choose the link again.',
                bodyPrefix: 'You are opening an external link:',
                bodySuffix: 'This link leaves the `VRCLearn` website. Verify that you trust the destination before continuing.',
                targetTitle: 'Destination',
                actionsLabel: 'External link actions',
                continue: 'Continue',
                back: 'Go back'
            }
        }
    },
    'ja-JP': {
        punctuation: {label: '：', sentence: '。'},
        shell: {
            openMenu: 'ナビゲーションメニューを開く',
            closeMenu: 'ナビゲーションメニューを閉じる',
            github: 'GitHubを開く',
            openTheme: 'テーマ設定を開く',
            navigation: 'チュートリアルナビゲーション',
            directory: 'チュートリアル一覧',
            notFoundBody: 'このパスは存在しません。サイトのナビゲーションから別のページを選択してください。',
            returnHome: 'ホームに戻る',
            externalPage: '外部ページ'
        },
        theme: {
            title: 'テーマ設定',
            reset: 'リセット',
            sourceColor: 'ソースカラー',
            chooseColor: 'テーマカラーを選択',
            hue: '色相',
            chroma: '彩度',
            tone: '明度',
            scheme: 'カラースキーム',
            separator: '：',
            mode: 'テーマモード',
            light: 'ライトモード',
            auto: '自動モード',
            dark: 'ダークモード',
            schemes: {
                'tonal-spot': 'トーナルスポット',
                'fidelity': 'フィデリティ',
                'monochrome': 'モノクローム',
                'neutral': 'ニュートラル',
                'vibrant': 'ビブラント',
                'expressive': 'エクスプレッシブ',
                'content': 'コンテンツ',
                'rainbow': 'レインボー',
                'fruit-salad': 'フルーツサラダ'
            }
        },
        pages: {
            home: {
                lead: '`VRCLearn`へようこそ！ここでは`VRChatアバター改変`を基礎から応用まで学べます。',
                quickTitle: 'クイックスタート',
                quickBody: 'このページをすでに読んでいる場合は、以下のリンクから学習やプロジェクトへの参加を始められます。',
                quickLabel: 'クイックリンク',
                startLearning: '学習を始める',
                joinCommunity: 'コミュニティに参加',
                submitFeedback: 'フィードバックを送る',
                introTitle: 'はじめに',
                intro: [
                    'ここは`VRCLearn`です。`VRChat`で遊ぶ中で、使用しているアバターを変更したり、自分だけのアバターに仕上げたいと思ったことはありませんか？',
                    'アバターを制作・変更するには`アバター改変`を学ぶ必要があります。しかし、適切なチュートリアルが見つからない、説明が分かりにくい、情報が古いといった問題があります。',
                    'すでに基礎を理解していても、解決しにくい問題、必要なツールの不足、プラグインの導入エラー、分かりにくい手順に遭遇することがあります。',
                    'このプロジェクトはそうした問題を解決し、気軽に`アバター改変`の世界へ入れるよう支援します。'
                ],
                overviewTitle: 'コンテンツ',
                overviewLead: 'プロジェクトは複数の`セクション`で構成されています。',
                overview: [
                    ['動画チュートリアル', 'アバター改変の流れ、手順、テクニックを動画で分かりやすく紹介します。'],
                    ['ダウンロード', 'Unityインストーラーや便利なパッケージ一覧など、必要なリソースを提供します。'],
                    ['ドキュメント', '基礎から応用までを体系的に学べるガイドです。'],
                    ['プロジェクトについて', 'メンテナンス情報、参加方法、貢献者や支援者を紹介します。'],
                    ['コミュニティ', '学習状況や質問、チュートリアル内容について交流できます。'],
                    ['フィードバック', '問題、訂正、リンク切れ、改善案をまとめて報告できます。']
                ],
                continue: '目的に合った`セクション`から始められますが、その前にこのページを最後まで読むことをおすすめします。',
                declarationTitle: 'お知らせ',
                declaration: [
                    '本プロジェクトのコンテンツはすべてオリジナルです。盗用は禁止されており、転載時は出典を明記してください。',
                    'チュートリアルには多くの`Unity`関連情報が含まれますが、一般的なUnity講座ではなく`VRChatアバター改変`のチュートリアルです。',
                    'VRChat SDK、Unity、プラグイン、プラットフォームの規約は更新される場合があります。可能な限り内容を維持しますが、最新の公式ドキュメント、リリースノート、ツール上の案内を優先してください。',
                    '動画とドキュメントの内容が異なる場合は、ドキュメントを優先してください。'
                ],
                notesTitle: '注意事項',
                notes: [
                    '経験がある場合でも、作業方法や手順を確認するため、`ドキュメント`を最初から読むことをおすすめします。',
                    'このような`情報カード`には重要な内容が含まれていることがあります。',
                    'アバター改変について質問がある場合は、`コミュニティ`で相談できます。',
                    'プロジェクトの問題は`フィードバック`または`GitHub Issues`から報告してください。'
                ]
            },
            video: {
                lead: 'このページでは`アバター改変`の動画チュートリアルを提供します。ネットワーク環境に合った`動画配信元`を選択してください。',
                maintenanceLabel: 'プロジェクトメンテナンスのお知らせ',
                maintenanceTitle: 'メンテナンス中',
                maintenanceBody: '動画チュートリアルを整理・更新しています。一部の配信元は内容が不完全、または一時的に利用できない場合があります。最新情報はドキュメントを確認してください。',
                entryTitle: '動画配信元',
                entryBody: '可能な場合は`YouTube`を利用してください。アクセスできない場合は`VRChat Data Hub`または`Bilibili`をお試しください。',
                entryLabel: '動画配信元ナビゲーション',
                youtube: 'YouTubeで見る',
                backup: 'VRChat Data Hubで見る',
                bilibili: 'Bilibiliで見る',
                youtubeBody: '`推奨`の視聴方法です。`YouTube`での視聴による収益はプロジェクトの支援につながります。',
                backupBody: '`VRChat Data Hub`は、`YouTube`へアクセスできない場合に利用できる予備の配信元です。',
                bilibiliBody: '`Bilibili`で現在公開されている動画チュートリアルを確認できます。'
            },
            download: {
                lead: '`アバター改変`に必要なリソースをダウンロードできます。ネットワーク環境に合った`ダウンロード元`を選択してください。',
                entryTitle: 'ダウンロード元',
                entryBody: '`公式サイト`からのダウンロードを優先してください。アクセスが不安定な場合は`クラウドドライブ`または`予備配信元`を利用できます。',
                entryLabel: 'ダウンロード方法',
                official: '公式ダウンロード',
                networkDisk: 'クラウドドライブ',
                backup: '予備ダウンロード',
                officialBody: '公式サイトへ安定してアクセスできる場合は、こちらからUnity EditorとALCOMD3を入手してください。',
                officialLabel: '公式ダウンロードリンク',
                unityHub: 'Unity Hubをダウンロード',
                unityEditor: 'Unity 2022.3.22f1をダウンロード',
                alcomd3: 'ALCOMD3公式サイト',
                networkDiskBody: '公式サイトが不安定、またはダウンロード速度が遅い場合はクラウドドライブのミラーを利用できます。',
                networkDiskLabel: 'クラウドドライブリンク',
                mobileCloud: '中国移動クラウド',
                baiduNetdisk: 'Baidu Netdisk',
                backupBody: '最初の2つの方法が利用できない場合のみ、この最終予備配信元を使用してください。',
                backupLabel: '予備ダウンロードリンク'
            },
            docs: {
                lead: 'ここはVRCLearnメインサイトのドキュメント入口です。ドキュメントは独立したサイトで管理され、このページに読み込んだり複製したりしません。',
                title: 'ドキュメントサイトを開く',
                body: 'VRCLearn DocsでAvatar、World、その他のVRCLearnプロジェクトのドキュメントを読むことができます。',
                label: 'ドキュメントリンク',
                action: 'VRCLearn Docsを開く'
            },
            community: {
                lead: 'ここは`VRCLearn`のコミュニティ入口です。学習状況の共有、アバター改変の質問、チュートリアルの議論、プロジェクトへの参加ができます。',
                joinTitle: 'コミュニティに参加',
                joinBody: '利用しやすいプラットフォームを選択してください。外部リンクを開く前に確認ページが表示され、移動先を確認できます。',
                joinLabel: 'コミュニティリンク',
                tencent: 'Tencent Channel',
                discord: 'Discord',
                adviceTitle: '質問するときのポイント',
                advice: [
                    '何をしているのか、どのような現象が起きたのか、期待する結果を説明してください。',
                    'スクリーンショット、エラー内容、Unity、VRChat SDK、関連プラグインのバージョンを添えてください。',
                    'チュートリアルの手順に関する問題は、該当ページやセクションを示してください。',
                    'アカウント、アクセスキー、有料リソース、許可のないモデル配布リンクを公開しないでください。'
                ],
                feedbackTitle: '訂正とフィードバック',
                feedbackBody: 'サイトの問題、チュートリアルの誤り、リンク切れ、リソース不足を見つけた場合は、フィードバックページからGitHub Issuesへ報告してください。',
                feedbackLabel: 'フィードバックリンク',
                feedbackAction: 'フィードバックを送る'
            },
            about: {
                lead: '`VRCLearn`はVRChatアバター改変を学ぶ人のための多言語プロジェクトで、ドキュメント、動画配信元、関連リソースを提供します。',
                maintenanceTitle: 'プロジェクト情報',
                productName: 'プロジェクト名',
                maintainer: 'メンテナー',
                maintenanceBody: 'ウェブサイトのソースとチュートリアル文書は別々に管理されています。参加する場合はGitHubでIssueやPull Requestを作成するか、事前にコミュニティで方向性を相談してください。',
                repositoriesLabel: 'プロジェクトリポジトリ',
                websiteRepository: 'ウェブサイトリポジトリ',
                docsRepository: 'ドキュメントリポジトリ',
                contributeTitle: '貢献方法',
                contribute: [
                    '誤り、古い情報、リンク切れ、分かりにくい表現を報告する。',
                    '初心者によくある質問、導入経験、バージョン差、再現手順を追加する。',
                    'ページ構成、アクセシビリティ、モバイル表示、ナビゲーションを改善する。',
                    'Pull Requestを送る前に、内容を正確で分かりやすく保ち、開発ガイドラインに従う。'
                ],
                thanksTitle: '謝辞',
                thanks: [
                    '議論、フィードバック、コンテンツの提供、メンテナンス支援に参加してくださる皆さまに感謝します。',
                    'スポンサーと貢献者の一覧は、整理が完了した後に追加します。'
                ]
            },
            feedback: {
                lead: '`VRCLearn`では現在、サイトの問題、チュートリアルの訂正、リンク切れ、改善案を`GitHub Issues`で受け付けています。',
                entryTitle: 'フィードバック',
                entryBody: '内容の誤り、ページの不具合、リンク切れ、新しいチュートリアルの提案はGitHub Issuesへ投稿してください。公開Issueにすることで、対応状況を追跡し、他の学習者も情報を追加できます。',
                entryLabel: 'GitHub Issuesリンク',
                newIssue: 'Issueを作成',
                viewIssues: 'Issueを見る',
                suitableTitle: 'Issueに適した内容',
                suitable: [
                    '誤りや分かりにくい説明、手順の不足、現在のツールバージョンと一致しない内容。',
                    'レイアウト、ナビゲーション、テーマ切替、モバイル表示、アクセスに関する問題。',
                    '開けないダウンロード、外部リンク、画像、ドキュメント項目。',
                    'アバター改変のテーマ、よくある質問、ツール解説、トラブルシューティングの提案。'
                ],
                includeTitle: '可能であれば含める情報',
                include: [
                    '問題があるページやドキュメントの場所と、可能であればリンク。',
                    '確認した現象、期待する結果、再現できる手順。',
                    'スクリーンショット、エラー内容、ブラウザー、Unity、VRChat SDK、プラグインのバージョン。',
                    'チュートリアル提案の場合は、対象読者、利用場面、解決したい具体的な問題。'
                ],
                avoidTitle: '公開Issueに投稿しない内容',
                avoid: [
                    'アカウント、メールアドレス、電話番号、チャット履歴、アクセスキーなどの個人情報や機密情報。',
                    '無断配布されたモデル、プラグイン、有料リソース、ダウンロードリンク。',
                    '個人環境でのみ発生し、再現に必要な情報がない問題。'
                ]
            },
            leaving: {
                invalid: '有効な外部リンクが見つかりません。前のページに戻ってリンクを選び直してください。',
                bodyPrefix: '外部リンクを開こうとしています：',
                bodySuffix: 'このリンクを開くと`VRCLearn`を離れます。移動先が信頼できることを確認してから続行してください。',
                targetTitle: '移動先',
                actionsLabel: '外部リンク操作',
                continue: '続行',
                back: '前のページに戻る'
            }
        }
    },
    'zh-TW': {
        punctuation: {label: '：', sentence: '。'},
        shell: {
            openMenu: '開啟導覽選單',
            closeMenu: '關閉導覽選單',
            github: '前往 GitHub',
            openTheme: '開啟主題控制面板',
            navigation: '教學導覽',
            directory: '教學目錄',
            notFoundBody: '此路徑不存在，請從網站導覽重新選擇頁面。',
            returnHome: '返回首頁',
            externalPage: '外部頁面'
        },
        theme: {
            title: '主題控制',
            reset: '重設',
            sourceColor: '來源色彩',
            chooseColor: '選擇主題色彩',
            hue: '色相',
            chroma: '彩度',
            tone: '明度',
            scheme: '配色方案',
            separator: '：',
            mode: '主題模式',
            light: '淺色模式',
            auto: '自動模式',
            dark: '深色模式',
            schemes: {
                'tonal-spot': '調性色彩',
                'fidelity': '高保真',
                'monochrome': '單色',
                'neutral': '中性',
                'vibrant': '活力',
                'expressive': '表現力',
                'content': '內容主題',
                'rainbow': '彩虹',
                'fruit-salad': '繽紛果色'
            }
        },
        pages: {
            home: {
                lead: '歡迎來到 `VRCLearn`！你可以在這裡從基礎到進階學習 `VRChat 改模`。',
                quickTitle: '快速開始',
                quickBody: '如果你已閱讀本頁內容，可以從以下入口快速開始學習或參與專案建設：',
                quickLabel: '快速入口',
                startLearning: '立即開始學習',
                joinCommunity: '加入社群',
                submitFeedback: '提交意見',
                introTitle: '引言',
                intro: [
                    '這裡是 `VRCLearn`。在遊玩 `VRChat` 的過程中，你是否想過修改使用中的虛擬形象，或打造專屬於自己的形象？',
                    '製作或修改虛擬形象需要學習`改模`。然而，學習時可能難以找到合適的教學、內容不易理解，或遇到已經過時的資料。',
                    '你也可能已經瞭解改模，卻仍會遇到難以解決的問題、缺少實用工具、外掛安裝失敗，或看不懂操作步驟。',
                    '本專案旨在解決這些問題，帶領你輕鬆進入`改模`的世界。'
                ],
                overviewTitle: '內容說明',
                overviewLead: '本專案分為多個`部分`：',
                overview: [
                    ['教學影片', '透過影片展示改模流程，協助學習者理解操作步驟與技巧。'],
                    ['資源下載', '提供 Unity 安裝程式、改模軟體套件清單等基本資源。'],
                    ['教學文件', '涵蓋基礎到進階內容的系統化教學。'],
                    ['關於專案', '介紹維護資訊、貢獻方式，並感謝參與者與贊助者。'],
                    ['加入社群', '提供學習交流、問題討論與內容共建的入口。'],
                    ['提交意見', '集中收集問題、勘誤、失效資源與改善建議。']
                ],
                continue: '你可以根據需求從任何`部分`開始。在此之前，建議先將本頁閱讀完畢。',
                declarationTitle: '聲明',
                declaration: [
                    '本專案的所有內容均為原創，禁止任何形式的抄襲；轉載時請註明出處。',
                    '教學包含大量 `Unity` 相關內容，但本專案並非一般 Unity 教學，而是 `VRChat 改模`教學。',
                    'VRChat SDK、Unity、外掛與平台規則可能更新。教學會盡量維護，但實際操作應以最新官方文件、版本說明與工具提示為準。',
                    '如果教學影片與教學文件內容不同，請以教學文件為準。'
                ],
                notesTitle: '注意事項',
                notes: [
                    '即使已有改模基礎，也建議從頭閱讀`教學文件`，確認自己的操作方式與流程。',
                    '瀏覽專案時請留意這類`提示卡片`，其中往往包含重要資訊。',
                    '如果有改模問題，可以加入我們的`社群`尋求協助。',
                    '如發現專案問題，可透過`提交意見`或`GitHub Issues`回報。'
                ]
            },
            video: {
                lead: '本頁提供`改模`教學影片，請依照網路環境選擇適合的`影片入口`。',
                maintenanceLabel: '專案維護警告',
                maintenanceTitle: '專案維護中',
                maintenanceBody: '教學影片正在整理與維護，部分入口的影片可能暫時不完整或無法使用。請優先參考教學文件中的最新說明。',
                entryTitle: '影片入口',
                entryBody: '請`優先`使用 `YouTube` 觀看。如無法存取，可以嘗試 `VRChat Data Hub` 或 `Bilibili`。',
                entryLabel: '影片入口導覽',
                youtube: '在 YouTube 觀看',
                backup: '在 VRChat Data Hub 觀看',
                bilibili: '在 Bilibili 觀看',
                youtubeBody: '這是`優先`選項。前往 `YouTube` 觀看教學，可以透過收益支持本專案。',
                backupBody: '`VRChat Data Hub` 是備用影片入口，適合無法存取 `YouTube` 時使用。',
                bilibiliBody: '前往 `Bilibili` 查看目前可用的教學影片。'
            },
            download: {
                lead: '本頁提供`改模`必備資源，請依照網路環境選擇適合的`下載入口`。',
                entryTitle: '下載入口',
                entryBody: '請`優先`使用`官方下載`。如連線不穩定，可以嘗試`網路硬碟`或`備用下載`。',
                entryLabel: '下載方式導覽',
                official: '官方下載',
                networkDisk: '網路硬碟下載',
                backup: '備用下載',
                officialBody: '前往官方網站取得 Unity 編輯器與 ALCOMD3，適合能夠穩定存取官方網站的環境。',
                officialLabel: '官方下載入口',
                unityHub: '下載 Unity Hub',
                unityEditor: '下載 Unity 2022.3.22f1',
                alcomd3: 'ALCOMD3 官方網站',
                networkDiskBody: '透過網路硬碟鏡像取得資源，適合官方網站不穩定或下載速度較慢的情況。',
                networkDiskLabel: '網路硬碟下載入口',
                mobileCloud: '中國移動雲盤',
                baiduNetdisk: '百度網盤',
                backupBody: '這是最終備用來源，僅適合前兩種方式都無法使用時採用。',
                backupLabel: '備用下載入口'
            },
            docs: {
                lead: '這裡是 VRCLearn 主站的教學文件入口。文件由獨立網站維護，本頁不會在主站中載入或複製文件內容。',
                title: '進入文件網站',
                body: '前往 VRCLearn Docs，閱讀 Avatar、World 與其他 VRCLearn 專案的文件。',
                label: '教學文件入口',
                action: '進入 VRCLearn Docs'
            },
            community: {
                lead: '這裡是 `VRCLearn` 的社群入口。你可以交流學習進度、提出改模問題、討論教學內容，或參與專案建設。',
                joinTitle: '加入社群',
                joinBody: '請依照使用習慣選擇平台。外部社群連結會先開啟離站確認頁，讓你確認目的地。',
                joinLabel: '社群入口',
                tencent: '騰訊頻道',
                discord: 'Discord',
                adviceTitle: '提問建議',
                advice: [
                    '說明你正在進行的操作、遇到的現象，以及預期結果。',
                    '附上螢幕截圖、錯誤訊息、Unity、VRChat SDK 與相關外掛版本。',
                    '如果問題來自教學步驟，請附上對應頁面或小節。',
                    '請勿公開傳送帳號、存取金鑰、付費資源檔案或未經授權的模型下載連結。'
                ],
                feedbackTitle: '意見與勘誤',
                feedbackBody: '如果發現網站問題、教學錯誤、連結失效或資源缺失，請從提交意見頁前往 GitHub Issues，方便維護者追蹤。',
                feedbackLabel: '意見入口',
                feedbackAction: '提交意見'
            },
            about: {
                lead: '`VRCLearn` 是面向 VRChat Avatar 改模學習者的多語言專案，提供教學文件、影片入口與相關資源。',
                maintenanceTitle: '維護資訊',
                productName: '專案名稱',
                maintainer: '維護者',
                maintenanceBody: '網站原始碼與教學文件分別維護。如要參與建設，可以在 GitHub 提交 Issue、Pull Request，或先到社群討論內容方向。',
                repositoriesLabel: '專案儲存庫入口',
                websiteRepository: '網站儲存庫',
                docsRepository: '文件儲存庫',
                contributeTitle: '貢獻方式',
                contribute: [
                    '回報教學中的錯誤、過時內容、失效連結或不清楚的表述。',
                    '補充新手常見問題、工具安裝經驗、版本差異與重現步驟。',
                    '改善網站結構、無障礙、行動裝置閱讀體驗與導覽。',
                    '提交 Pull Request 前，請保持內容準確、結構清楚，並遵循專案開發規範。'
                ],
                thanksTitle: '鳴謝',
                thanks: [
                    '感謝所有參與討論、提供意見、貢獻內容與支持維護的人。',
                    '贊助者與貢獻者名單將在整理完成後補充。'
                ]
            },
            feedback: {
                lead: '`VRCLearn` 目前統一透過 `GitHub Issues` 收集網站問題、教學勘誤、資源失效與改善建議。',
                entryTitle: '意見入口',
                entryBody: '如發現內容錯誤、頁面異常、連結失效，或有新的教學建議，請透過 GitHub Issues 提交。公開 Issue 方便維護者追蹤，也能讓其他學習者補充資訊。',
                entryLabel: 'GitHub Issues 入口',
                newIssue: '建立 Issue',
                viewIssues: '查看 Issues',
                suitableTitle: '適合提交的內容',
                suitable: [
                    '教學內容有誤、表述不清、步驟缺失或與目前工具版本不一致。',
                    '頁面排版、導覽、主題切換、行動裝置顯示或存取體驗存在問題。',
                    '下載入口、外部連結、圖片或文件目錄無法正常開啟。',
                    '希望補充改模主題、常見問題、工具說明或疑難排解流程。'
                ],
                includeTitle: '提交前請盡量包含',
                include: [
                    '問題所在的頁面或文件位置，最好附上連結。',
                    '你看到的現象、預期結果，以及可以重現的操作步驟。',
                    '相關截圖、錯誤訊息、瀏覽器、Unity、VRChat SDK 或外掛版本。',
                    '如果是教學建議，請說明目標讀者、使用情境與要解決的具體問題。'
                ],
                avoidTitle: '不建議提交到公開 Issue 的內容',
                avoid: [
                    '帳號、電子郵件、電話號碼、聊天記錄、存取金鑰等隱私或敏感資訊。',
                    '未經授權散布的模型、外掛、付費資源或下載連結。',
                    '只有個人環境可見，且沒有重現資訊的問題描述。'
                ]
            },
            leaving: {
                invalid: '找不到有效的外部連結。你可以返回上一頁重新選擇入口。',
                bodyPrefix: '你正在開啟外部連結：',
                bodySuffix: '此連結將離開 `VRCLearn` 網站，請確認目的地可信後再繼續。',
                targetTitle: '目的地',
                actionsLabel: '離站操作',
                continue: '繼續前往',
                back: '返回上一頁'
            }
        }
    },
    'zh-CN': {
        punctuation: {label: '：', sentence: '。'},
        shell: {
            openMenu: '打开导航菜单',
            closeMenu: '关闭导航菜单',
            github: '访问 GitHub',
            openTheme: '打开主题控制面板',
            navigation: '教程导航',
            directory: '教程目录',
            notFoundBody: '此路径不存在，请从主站导航重新选择。',
            returnHome: '返回首页',
            externalPage: '外部页面'
        },
        theme: {
            title: '主题控制',
            reset: '重置',
            sourceColor: '源颜色',
            chooseColor: '选择主题色',
            hue: '色相',
            chroma: '色度',
            tone: '明度',
            scheme: '配色方案',
            separator: '：',
            mode: '主题模式',
            light: '浅色模式',
            auto: '自动模式',
            dark: '深色模式',
            schemes: {
                'tonal-spot': '调性点缀',
                'fidelity': '高保真',
                'monochrome': '单色',
                'neutral': '中性',
                'vibrant': '活力',
                'expressive': '表现力',
                'content': '内容主题',
                'rainbow': '彩虹',
                'fruit-salad': '果缤纷'
            }
        },
        pages: {
            home: {
                lead: '欢迎来到 `VRCLearn`！你将在这里学会 `VRChat 改模`，从基础到进阶。',
                quickTitle: '快速开始',
                quickBody: '如果你已经阅读过本页内容，你可以从以下入口快速开始学习或参与项目建设：',
                quickLabel: '快速入口',
                startLearning: '立即开始学习',
                joinCommunity: '加入社区',
                submitFeedback: '提交反馈',
                introTitle: '引言',
                intro: [
                    '这里是 `VRCLearn`。在游玩 `VRChat` 的过程中，你是否常想对使用的虚拟形象进行修改？是否希望定制属于自己的虚拟形象？',
                    '想要制作或修改虚拟形象，就要学习`改模`。然而，在学习的过程中，你可能会遇到难以找到合适教程、内容晦涩难懂或资料已经过时等困难。',
                    '你也可能已经对`改模`有所了解，但仍会遇到难以解决的问题、缺少实用软件包、插件安装失败，或教程看不懂等情况。',
                    '本项目旨在解决这些问题，带领你以轻松的方式走入`改模`的世界。'
                ],
                overviewTitle: '内容说明',
                overviewLead: '本项目分为多个`部分`：',
                overview: [
                    ['视频教程', '通过视频展示改模过程，帮助学习者直观理解操作步骤和技巧。'],
                    ['资源下载', '提供 Unity 安装包、改模软件包列表等基本资源。'],
                    ['教程文档', '涵盖从基础到进阶内容的系统化教程。'],
                    ['关于项目', '介绍维护信息和贡献方式，鸣谢参与者与赞助者。'],
                    ['加入社区', '提供学习交流、问题讨论和内容共建的入口。'],
                    ['提交反馈', '集中收集问题、勘误、失效资源和改进建议。']
                ],
                continue: '你可以根据需求从本项目的任何`部分`开始。但在此之前，希望你能继续将本页面看完。',
                declarationTitle: '声明',
                declaration: [
                    '本项目中的所有内容均为原创，禁止任何形式的抄袭，转载请注明出处。',
                    '教程中含有大量 `Unity` 相关内容，但本项目并非专业 Unity 教程，而是 `VRChat 改模`教程。',
                    'VRChat SDK、Unity、插件和平台规则可能更新。教程会尽量维护，但实际操作应以最新官方文档、版本说明和工具提示为准。',
                    '若视频教程内容与教程文档不同，以教程文档为准。'
                ],
                notesTitle: '注意事项',
                notes: [
                    '即使已经有一定改模基础，也建议从头阅读`教程文档`，以验证自己的改模方式与流程。',
                    '浏览本项目时，请留意这类`提示卡片`，其中往往包含重要信息。',
                    '如果有改模问题，可以加入我们的`社区`寻求帮助。',
                    '如果发现项目问题，可以通过`提交反馈`或`GitHub Issues`向我们提交信息。'
                ]
            },
            video: {
                lead: '本页提供`改模`教程视频，请根据网络环境选择合适的`视频入口`。',
                maintenanceLabel: '项目维护警告',
                maintenanceTitle: '项目维护中',
                maintenanceBody: '教程视频正在整理和维护，部分入口的视频可能暂时不完整或不可用。请优先参考教程文档中的最新说明。',
                entryTitle: '视频入口',
                entryBody: '请`优先`使用 `YouTube` 观看。如无法访问，可尝试 `VRChat Data Hub` 或 `Bilibili`。',
                entryLabel: '视频入口导航',
                youtube: 'YouTube 观看',
                backup: 'VRChat Data Hub 观看',
                bilibili: 'Bilibili 观看',
                youtubeBody: '这是`优先`选择。前往 `YouTube` 观看教程，可以通过收益支持我们的项目。',
                backupBody: '`VRChat Data Hub` 提供备用视频入口，适合无法访问 `YouTube` 时使用。',
                bilibiliBody: '前往 `Bilibili` 查看目前可用的教程视频。'
            },
            download: {
                lead: '本页提供`改模`必备资源，请根据网络环境选择合适的`下载入口`。',
                entryTitle: '下载入口',
                entryBody: '请`优先`使用`官网下载`。如访问不稳定，可尝试`网盘下载`或`备用下载`。',
                entryLabel: '下载方式导航',
                official: '官网下载',
                networkDisk: '网盘下载',
                backup: '备用下载',
                officialBody: '前往官方站点获取 Unity 编辑器与 ALCOMD3，适合能够稳定访问官网的环境。',
                officialLabel: '官网下载入口',
                unityHub: 'Unity Hub 下载',
                unityEditor: 'Unity 2022.3.22f1 下载',
                alcomd3: 'ALCOMD3 官网',
                networkDiskBody: '通过网盘镜像获取资源，适合官网访问不稳定或下载速度较慢的情况。',
                networkDiskLabel: '网盘下载入口',
                mobileCloud: '移动云盘',
                baiduNetdisk: '百度网盘',
                backupBody: '这是最终备用下载源，仅适合前两种方式不可用时使用。',
                backupLabel: '备用下载入口'
            },
            docs: {
                lead: '这里是 VRCLearn 主站的教程文档入口。文档由独立站点维护，本页不会在主站内加载或复制文档内容。',
                title: '进入文档站',
                body: '前往 VRCLearn Docs，阅读 Avatar、World 与其他 VRCLearn 项目的文档。',
                label: '教程文档入口',
                action: '进入 VRCLearn Docs'
            },
            community: {
                lead: '这里是 `VRCLearn` 的社区入口。你可以交流学习进度、提出改模问题、讨论教程内容，或参与项目建设。',
                joinTitle: '加入社区',
                joinBody: '请根据使用习惯选择平台。外部社区链接会先进入离站确认页，让你确认目标地址。',
                joinLabel: '社区入口',
                tencent: '腾讯频道',
                discord: 'Discord',
                adviceTitle: '提问建议',
                advice: [
                    '说明你正在做什么、遇到了什么现象，以及你期望的结果。',
                    '附上截图、报错文本、Unity、VRChat SDK 和相关插件版本。',
                    '如果问题来自教程步骤，请附上对应页面或小节。',
                    '请勿公开发送账号、授权密钥、付费资源文件或未经授权的模型下载链接。'
                ],
                feedbackTitle: '反馈与勘误',
                feedbackBody: '如果发现网站问题、教程错误、链接失效或资源缺失，请通过提交反馈页进入 GitHub Issues，方便维护者追踪。',
                feedbackLabel: '反馈入口',
                feedbackAction: '提交反馈'
            },
            about: {
                lead: '`VRCLearn` 是面向 VRChat Avatar 改模学习者的多语言项目，提供教程文档、视频入口和相关资源。',
                maintenanceTitle: '维护信息',
                productName: '项目名称',
                maintainer: '维护者',
                maintenanceBody: '网站源码与教程文档分别维护。如果希望参与建设，可以通过 GitHub 提交 Issue、Pull Request，或先前往社区沟通内容方向。',
                repositoriesLabel: '项目仓库入口',
                websiteRepository: '网站仓库',
                docsRepository: '文档仓库',
                contributeTitle: '贡献方式',
                contribute: [
                    '反馈教程中的错误、过时内容、失效链接或不清楚的表述。',
                    '补充新手常见问题、工具安装经验、版本差异和复现步骤。',
                    '改进网站结构、可访问性、移动端阅读体验和导航。',
                    '提交 Pull Request 前，请保持内容准确、结构清晰，并遵循项目开发规范。'
                ],
                thanksTitle: '鸣谢',
                thanks: [
                    '感谢所有参与讨论、提出反馈、贡献内容和支持项目维护的人。',
                    '赞助者与贡献者名单将在整理完成后补充。'
                ]
            },
            feedback: {
                lead: '`VRCLearn` 目前统一通过 `GitHub Issues` 收集网站问题、教程勘误、资源失效和改进建议。',
                entryTitle: '反馈入口',
                entryBody: '如果发现内容错误、页面异常、链接失效，或有新的教程建议，请通过 GitHub Issues 提交。公开 Issue 方便维护者追踪进度，也方便其他学习者补充信息。',
                entryLabel: 'GitHub Issues 入口',
                newIssue: '新建 Issue',
                viewIssues: '查看 Issues',
                suitableTitle: '适合提交的内容',
                suitable: [
                    '教程内容有误、表述不清、步骤缺失或与当前工具版本不一致。',
                    '页面排版、导航、主题切换、移动端显示或访问体验存在问题。',
                    '下载入口、外部链接、图片或文档目录无法正常打开。',
                    '希望补充改模主题、常见问题、工具说明或排错流程。'
                ],
                includeTitle: '提交前请尽量包含',
                include: [
                    '问题所在页面或文档位置，最好附上链接。',
                    '你看到的现象、期望结果，以及可以复现的操作步骤。',
                    '相关截图、报错文本、浏览器、Unity、VRChat SDK 或插件版本。',
                    '如果是教程建议，请说明目标读者、使用场景和要解决的具体问题。'
                ],
                avoidTitle: '不建议提交到公开 Issue 的内容',
                avoid: [
                    '账号、邮箱、手机号、群聊记录、授权密钥等隐私或敏感信息。',
                    '未经授权分发的模型、插件、付费资源或下载链接。',
                    '只有个人环境可见，且没有复现信息的问题描述。'
                ]
            },
            leaving: {
                invalid: '未找到有效的外部链接。你可以返回上一页重新选择入口。',
                bodyPrefix: '你正在打开外部链接：',
                bodySuffix: '该链接将离开 `VRCLearn` 网站，请确认目标地址可信后继续访问。',
                targetTitle: '目标地址',
                actionsLabel: '离站操作',
                continue: '继续访问',
                back: '返回上一页'
            }
        }
    }
};

export function getLocalizedContent(lang) {
    const locale = getCanonicalLang(lang);
    return CONTENT[locale] || CONTENT[siteConfig.siteMetadata.defaultLocale];
}
