type LegalPage = 'privacy' | 'terms' | 'contact' | 'about';
type LegalLocale = 'en' | 'zh' | 'vi' | 'ja';

type Section = {
  title: string;
  body: string[];
};

type PageCopy = {
  title: string;
  description: string;
  updated: string;
  sections: Section[];
};

const supportEmail = 'support@ui-ux-pro-max-skill.com';

const copy: Record<LegalLocale, Record<LegalPage, PageCopy>> = {
  en: {
    privacy: {
      title: 'Privacy Policy',
      description: 'How UI UX Pro Max Skill handles analytics, advertising, cookies, and contact information.',
      updated: 'Last updated: May 4, 2026',
      sections: [
        {
          title: 'Information we collect',
          body: [
            'This website is a public documentation and product site. We do not require accounts, logins, or payment details to browse it.',
            'If you contact us, we may receive the information you choose to provide, such as your name, email address, message content, and related technical context.'
          ]
        },
        {
          title: 'Analytics and advertising technologies',
          body: [
            'We use Google Analytics to understand aggregate site usage. If Google AdSense is enabled, Google and other third-party vendors may use cookies, web beacons, IP addresses, device identifiers, and similar technologies to serve, measure, and personalize ads.',
            'Third parties may place and read cookies on your browser or use web beacons and IP addresses as a result of ad serving on this website.'
          ]
        },
        {
          title: 'How information is used',
          body: [
            'We use aggregate analytics to improve documentation, navigation, content quality, and site performance.',
            'Advertising partners may use data to provide ad delivery, fraud prevention, measurement, reporting, and personalized or non-personalized advertising where permitted.'
          ]
        },
        {
          title: 'Your choices',
          body: [
            'You can manage cookies in your browser settings. You can learn how Google uses data on partner sites at https://policies.google.com/technologies/partner-sites.',
            'You can opt out of personalized advertising through Google Ads Settings at https://adssettings.google.com/ where available.'
          ]
        },
        {
          title: 'Contact',
          body: [`For privacy questions, email ${supportEmail}.`]
        }
      ]
    },
    terms: {
      title: 'Terms of Use',
      description: 'Terms for using the UI UX Pro Max Skill website and documentation.',
      updated: 'Last updated: May 4, 2026',
      sections: [
        {
          title: 'Use of this site',
          body: [
            'This site provides documentation, examples, and references for UI UX Pro Max Skill. You may use the public content for evaluation, learning, and implementation support subject to any license terms in the project repository.',
            'Do not misuse the site, interfere with its availability, or attempt to access systems or data that are not intentionally public.'
          ]
        },
        {
          title: 'Content accuracy',
          body: [
            'We aim to keep the documentation accurate and useful, but the content is provided as-is and may change over time.',
            'You are responsible for validating that any recommendations, prompts, or implementation examples fit your own project and compliance requirements.'
          ]
        },
        {
          title: 'Third-party services',
          body: [
            'The site may link to third-party services such as GitHub, Google, analytics providers, or advertising partners. Their own terms and policies apply when you use those services.'
          ]
        },
        {
          title: 'Contact',
          body: [`For questions about these terms, email ${supportEmail}.`]
        }
      ]
    },
    contact: {
      title: 'Contact',
      description: 'Ways to reach the UI UX Pro Max Skill project.',
      updated: 'Last updated: May 4, 2026',
      sections: [
        {
          title: 'Project support',
          body: [
            'For bug reports, documentation issues, feature requests, or licensing questions, use the GitHub repository linked from the site announcement bar.',
            'Please include the page URL, expected behavior, actual behavior, and any relevant screenshots or command output when reporting an issue.'
          ]
        },
        {
          title: 'Privacy and policy questions',
          body: [`For privacy, advertising, or policy questions, email ${supportEmail}.`]
        }
      ]
    },
    about: {
      title: 'About This Site',
      description: 'Who runs UI UX Pro Max Skill docs, what we publish, and how the content is produced.',
      updated: 'Last updated: June 12, 2026',
      sections: [
        {
          title: 'What this site is',
          body: [
            'This site is the documentation and learning companion for UI UX Pro Max, an open-source AI skill that gives coding assistants like Claude practical design intelligence: curated UI styles, color palettes, font pairings, and UX rules they can apply when generating interfaces.',
            'Beyond the reference docs, we publish original articles and step-by-step tutorials about a specific craft: getting professional, accessible, maintainable UI out of AI coding tools. Everything is available in English, Chinese, Japanese, and Vietnamese.'
          ]
        },
        {
          title: 'Who runs it',
          body: [
            'The site is built and maintained by Zley, an independent developer. Zley writes and edits the blog and tutorial content, maintains the four language versions, and runs the infrastructure.',
            'The underlying skill is an open-source project; this site documents it and teaches the workflows around it.'
          ]
        },
        {
          title: 'How the content is made',
          body: [
            'Articles come from real usage: the prompt patterns, failure modes, and checklists we publish are ones we use and test against actual AI-generated output before writing about them.',
            'Specific claims are verified before publishing — contrast ratios are computed, prompt templates are run, and code examples are compiled. When we get something wrong, we correct the article rather than quietly deleting it.',
            'AI tools are part of how this site is produced — fitting, given the subject — but every article starts from our own outline and experience, and every fact in it is checked by a human before it ships.'
          ]
        },
        {
          title: 'Advertising and independence',
          body: [
            'The site may show ads (for example through Google AdSense) to cover hosting and development time. Advertisers have no influence on what we write; we do not publish sponsored posts or paid reviews.'
          ]
        },
        {
          title: 'Contact',
          body: [`Found an error, or want to suggest a topic? Email ${supportEmail}, or open an issue on the GitHub repository linked in the site announcement bar.`]
        }
      ]
    }
  },
  zh: {
    privacy: {
      title: '隐私政策',
      description: '说明 UI UX Pro Max Skill 如何处理分析、广告、Cookie 和联系信息。',
      updated: '最后更新：2026 年 5 月 4 日',
      sections: [
        {
          title: '我们收集的信息',
          body: [
            '本网站是公开的文档和产品介绍站点。浏览网站不需要账号、登录或付款信息。',
            '如果你主动联系我们，我们可能会收到你提供的信息，例如姓名、邮箱、消息内容和相关技术背景。'
          ]
        },
        {
          title: '分析与广告技术',
          body: [
            '我们使用 Google Analytics 了解汇总的网站使用情况。如果启用 Google AdSense，Google 和其他第三方供应商可能会使用 Cookie、网络信标、IP 地址、设备标识符和类似技术来投放、衡量和个性化广告。',
            '由于本网站投放广告，第三方可能会在你的浏览器中放置和读取 Cookie，或使用网络信标和 IP 地址。'
          ]
        },
        {
          title: '信息用途',
          body: [
            '我们使用汇总分析数据来改进文档、导航、内容质量和网站性能。',
            '广告合作方可能会将数据用于广告投放、反欺诈、效果衡量、报告，以及在法律允许时提供个性化或非个性化广告。'
          ]
        },
        {
          title: '你的选择',
          body: [
            '你可以在浏览器设置中管理 Cookie。你可以在 https://policies.google.com/technologies/partner-sites 了解 Google 如何使用合作伙伴网站上的数据。',
            '在可用地区，你可以通过 https://adssettings.google.com/ 管理或退出 Google 个性化广告。'
          ]
        },
        {
          title: '联系',
          body: [`如有隐私问题，请发送邮件到 ${supportEmail}。`]
        }
      ]
    },
    terms: {
      title: '使用条款',
      description: '使用 UI UX Pro Max Skill 网站和文档时适用的条款。',
      updated: '最后更新：2026 年 5 月 4 日',
      sections: [
        {
          title: '网站使用',
          body: [
            '本网站提供 UI UX Pro Max Skill 的文档、示例和参考资料。你可以在项目仓库许可证约束下，将公开内容用于评估、学习和实现参考。',
            '请勿滥用网站、干扰网站可用性，或尝试访问并非公开提供的系统或数据。'
          ]
        },
        {
          title: '内容准确性',
          body: [
            '我们会尽量保持文档准确有用，但内容按现状提供，并可能随时间调整。',
            '你需要自行确认推荐、提示词和实现示例是否适合自己的项目和合规要求。'
          ]
        },
        {
          title: '第三方服务',
          body: ['本网站可能链接到 GitHub、Google、分析服务或广告合作方等第三方服务。使用这些服务时适用其自身条款和政策。']
        },
        {
          title: '联系',
          body: [`如对这些条款有疑问，请发送邮件到 ${supportEmail}。`]
        }
      ]
    },
    contact: {
      title: '联系',
      description: '联系 UI UX Pro Max Skill 项目的方式。',
      updated: '最后更新：2026 年 5 月 4 日',
      sections: [
        {
          title: '项目支持',
          body: [
            '如需报告 bug、文档问题、功能请求或许可证问题，请使用网站公告栏链接的 GitHub 仓库。',
            '提交问题时请包含页面 URL、预期行为、实际行为，以及相关截图或命令输出。'
          ]
        },
        {
          title: '隐私与政策问题',
          body: [`如有隐私、广告或政策问题，请发送邮件到 ${supportEmail}。`]
        }
      ]
    },
    about: {
      title: '关于本站',
      description: '谁在运营 UI UX Pro Max Skill 文档站、我们发布什么内容、内容是如何生产的。',
      updated: '最后更新：2026 年 6 月 12 日',
      sections: [
        {
          title: '这个网站是什么',
          body: [
            '本站是 UI UX Pro Max 的文档与学习站。UI UX Pro Max 是一个开源 AI 技能，为 Claude 等编程助手提供可落地的设计知识：精选的 UI 风格、配色方案、字体配对和 UX 规则，让 AI 在生成界面时有据可依。',
            '在参考文档之外，我们围绕一门具体的手艺持续发布原创文章和分步教程：如何让 AI 编程工具产出专业、可访问、可维护的界面。全部内容提供英文、中文、日文和越南文四个版本。'
          ]
        },
        {
          title: '谁在运营',
          body: [
            '本站由独立开发者 Zley 构建和维护。博客与教程内容由 Zley 撰写和编辑，四个语言版本和站点基础设施也由其负责。',
            '底层技能是一个开源项目；本站为它提供文档，并教授围绕它的工作流。'
          ]
        },
        {
          title: '内容如何生产',
          body: [
            '文章来自真实使用：我们发布的 Prompt 模式、失败案例和检查清单，都先在实际的 AI 生成产出上使用和验证过，然后才写成文章。',
            '具体的断言在发布前会被核实——对比度比率经过计算、Prompt 模板实际跑过、代码示例通过编译。如果我们写错了，会修正文章并注明，而不是悄悄删掉。',
            'AI 工具参与了本站的生产过程——考虑到主题，这再合适不过——但每篇文章都始于我们自己的提纲和经验，文中每个事实在发布前都经过人工核查。'
          ]
        },
        {
          title: '广告与独立性',
          body: [
            '本站可能展示广告（例如通过 Google AdSense）以覆盖托管和开发成本。广告主不影响我们写什么；我们不发布软文或付费测评。'
          ]
        },
        {
          title: '联系',
          body: [`发现错误，或想建议选题？发邮件到 ${supportEmail}，或在网站公告栏链接的 GitHub 仓库提 issue。`]
        }
      ]
    }
  },
  vi: {
    privacy: {
      title: 'Chính sách quyền riêng tư',
      description: 'Cách UI UX Pro Max Skill xử lý phân tích, quảng cáo, cookie và thông tin liên hệ.',
      updated: 'Cập nhật lần cuối: 4 tháng 5, 2026',
      sections: [
        {
          title: 'Thông tin chúng tôi thu thập',
          body: [
            'Website này là trang tài liệu và giới thiệu sản phẩm công khai. Bạn không cần tài khoản, đăng nhập hoặc thông tin thanh toán để duyệt website.',
            'Nếu bạn liên hệ với chúng tôi, chúng tôi có thể nhận thông tin bạn tự nguyện cung cấp, chẳng hạn như tên, địa chỉ email, nội dung tin nhắn và ngữ cảnh kỹ thuật liên quan.'
          ]
        },
        {
          title: 'Công nghệ phân tích và quảng cáo',
          body: [
            'Chúng tôi sử dụng Google Analytics để hiểu cách sử dụng website ở dạng tổng hợp. Nếu Google AdSense được bật, Google và các nhà cung cấp bên thứ ba khác có thể dùng cookie, web beacon, địa chỉ IP, mã định danh thiết bị và công nghệ tương tự để phân phối, đo lường và cá nhân hóa quảng cáo.',
            'Các bên thứ ba có thể đặt và đọc cookie trong trình duyệt của bạn, hoặc dùng web beacon và địa chỉ IP do hoạt động phân phối quảng cáo trên website này.'
          ]
        },
        {
          title: 'Cách sử dụng thông tin',
          body: [
            'Chúng tôi dùng dữ liệu phân tích tổng hợp để cải thiện tài liệu, điều hướng, chất lượng nội dung và hiệu năng website.',
            'Đối tác quảng cáo có thể dùng dữ liệu để phân phối quảng cáo, chống gian lận, đo lường, báo cáo và cung cấp quảng cáo cá nhân hóa hoặc không cá nhân hóa khi được phép.'
          ]
        },
        {
          title: 'Lựa chọn của bạn',
          body: [
            'Bạn có thể quản lý cookie trong cài đặt trình duyệt. Bạn có thể tìm hiểu cách Google dùng dữ liệu trên website đối tác tại https://policies.google.com/technologies/partner-sites.',
            'Ở những nơi khả dụng, bạn có thể tắt quảng cáo cá nhân hóa qua Google Ads Settings tại https://adssettings.google.com/.'
          ]
        },
        {
          title: 'Liên hệ',
          body: [`Nếu có câu hỏi về quyền riêng tư, vui lòng gửi email tới ${supportEmail}.`]
        }
      ]
    },
    terms: {
      title: 'Điều khoản sử dụng',
      description: 'Điều khoản khi sử dụng website và tài liệu của UI UX Pro Max Skill.',
      updated: 'Cập nhật lần cuối: 4 tháng 5, 2026',
      sections: [
        {
          title: 'Sử dụng website này',
          body: [
            'Website này cung cấp tài liệu, ví dụ và tài liệu tham khảo cho UI UX Pro Max Skill. Bạn có thể dùng nội dung công khai để đánh giá, học tập và hỗ trợ triển khai, tùy theo điều khoản giấy phép trong repository dự án.',
            'Không lạm dụng website, gây ảnh hưởng đến khả dụng của website, hoặc cố truy cập hệ thống hay dữ liệu không được công khai có chủ đích.'
          ]
        },
        {
          title: 'Độ chính xác của nội dung',
          body: [
            'Chúng tôi cố gắng giữ tài liệu chính xác và hữu ích, nhưng nội dung được cung cấp theo hiện trạng và có thể thay đổi theo thời gian.',
            'Bạn chịu trách nhiệm xác minh rằng mọi khuyến nghị, prompt hoặc ví dụ triển khai phù hợp với dự án và yêu cầu tuân thủ của riêng bạn.'
          ]
        },
        {
          title: 'Dịch vụ bên thứ ba',
          body: [
            'Website có thể liên kết đến dịch vụ bên thứ ba như GitHub, Google, nhà cung cấp phân tích hoặc đối tác quảng cáo. Khi bạn dùng các dịch vụ đó, điều khoản và chính sách riêng của họ sẽ được áp dụng.'
          ]
        },
        {
          title: 'Liên hệ',
          body: [`Nếu có câu hỏi về các điều khoản này, vui lòng gửi email tới ${supportEmail}.`]
        }
      ]
    },
    contact: {
      title: 'Liên hệ',
      description: 'Các cách liên hệ với dự án UI UX Pro Max Skill.',
      updated: 'Cập nhật lần cuối: 4 tháng 5, 2026',
      sections: [
        {
          title: 'Hỗ trợ dự án',
          body: [
            'Đối với báo cáo lỗi, vấn đề tài liệu, yêu cầu tính năng hoặc câu hỏi về giấy phép, hãy dùng repository GitHub được liên kết trên thanh thông báo của website.',
            'Khi báo cáo vấn đề, vui lòng bao gồm URL trang, hành vi mong đợi, hành vi thực tế và ảnh chụp màn hình hoặc đầu ra lệnh liên quan nếu có.'
          ]
        },
        {
          title: 'Câu hỏi về quyền riêng tư và chính sách',
          body: [`Nếu có câu hỏi về quyền riêng tư, quảng cáo hoặc chính sách, vui lòng gửi email tới ${supportEmail}.`]
        }
      ]
    },
    about: {
      title: 'Về trang này',
      description: 'Ai vận hành trang tài liệu UI UX Pro Max Skill, chúng tôi xuất bản gì, và nội dung được tạo ra như thế nào.',
      updated: 'Cập nhật lần cuối: 12 tháng 6, 2026',
      sections: [
        {
          title: 'Trang web này là gì',
          body: [
            'Đây là trang tài liệu và học tập của UI UX Pro Max — một AI skill mã nguồn mở cung cấp tri thức thiết kế thực dụng cho các trợ lý lập trình như Claude: các style UI tuyển chọn, bảng màu, cặp font và quy tắc UX để AI áp dụng khi sinh giao diện.',
            'Ngoài tài liệu tham khảo, chúng tôi xuất bản bài viết gốc và tutorial từng bước về một nghề cụ thể: làm sao để công cụ lập trình AI tạo ra giao diện chuyên nghiệp, dễ tiếp cận, dễ bảo trì. Toàn bộ nội dung có bốn ngôn ngữ: Anh, Trung, Nhật và Việt.'
          ]
        },
        {
          title: 'Ai vận hành',
          body: [
            'Trang được xây dựng và duy trì bởi Zley, một lập trình viên độc lập. Zley viết và biên tập nội dung blog cùng tutorial, duy trì bốn phiên bản ngôn ngữ và vận hành hạ tầng.',
            'Skill nền tảng là một dự án mã nguồn mở; trang này viết tài liệu cho nó và dạy các workflow xung quanh nó.'
          ]
        },
        {
          title: 'Nội dung được tạo ra thế nào',
          body: [
            'Bài viết đến từ sử dụng thật: các khuôn mẫu prompt, kiểu thất bại và checklist chúng tôi đăng đều được dùng và kiểm chứng trên output AI thật trước khi viết thành bài.',
            'Các tuyên bố cụ thể được xác minh trước khi đăng — tỷ lệ contrast được tính toán, template prompt được chạy thử, ví dụ code được biên dịch. Khi viết sai, chúng tôi sửa bài và ghi chú thay vì lặng lẽ xóa.',
            'Công cụ AI là một phần trong cách trang này được sản xuất — hợp lý, xét theo chủ đề — nhưng mỗi bài đều bắt đầu từ dàn ý và kinh nghiệm của chính chúng tôi, và mọi dữ kiện đều được con người kiểm tra trước khi xuất bản.'
          ]
        },
        {
          title: 'Quảng cáo và tính độc lập',
          body: [
            'Trang có thể hiển thị quảng cáo (ví dụ qua Google AdSense) để trang trải chi phí hosting và thời gian phát triển. Nhà quảng cáo không ảnh hưởng đến nội dung; chúng tôi không đăng bài tài trợ hay review trả phí.'
          ]
        },
        {
          title: 'Liên hệ',
          body: [`Phát hiện lỗi, hoặc muốn gợi ý chủ đề? Gửi email tới ${supportEmail}, hoặc mở issue trên repository GitHub được liên kết ở thanh thông báo của trang.`]
        }
      ]
    }
  },
  ja: {
    privacy: {
      title: 'プライバシーポリシー',
      description: 'UI UX Pro Max Skill が分析、広告、Cookie、連絡先情報をどのように扱うかを説明します。',
      updated: '最終更新日: 2026 年 5 月 4 日',
      sections: [
        {
          title: '収集する情報',
          body: [
            'このウェブサイトは公開されたドキュメントおよび製品紹介サイトです。閲覧にあたって、アカウント、ログイン、支払い情報は必要ありません。',
            'お問い合わせいただいた場合、氏名、メールアドレス、メッセージ内容、関連する技術的背景など、利用者が提供した情報を受け取ることがあります。'
          ]
        },
        {
          title: '分析および広告技術',
          body: [
            '当サイトでは、サイト利用状況を集計して把握するために Google Analytics を使用します。Google AdSense が有効な場合、Google およびその他の第三者ベンダーは、広告の配信、測定、パーソナライズのために Cookie、Web ビーコン、IP アドレス、デバイス識別子、類似技術を使用することがあります。',
            '当サイトで広告が配信される結果として、第三者がブラウザに Cookie を配置または読み取ったり、Web ビーコンや IP アドレスを使用したりする場合があります。'
          ]
        },
        {
          title: '情報の利用目的',
          body: [
            '集計された分析データは、ドキュメント、ナビゲーション、コンテンツ品質、サイト性能の改善に使用します。',
            '広告パートナーは、許可される範囲で、広告配信、不正防止、測定、レポート、パーソナライズ広告または非パーソナライズ広告の提供にデータを使用することがあります。'
          ]
        },
        {
          title: '利用者の選択肢',
          body: [
            'Cookie はブラウザ設定で管理できます。Google がパートナーサイトのデータをどのように使用するかは https://policies.google.com/technologies/partner-sites で確認できます。',
            '利用可能な地域では、https://adssettings.google.com/ の Google 広告設定からパーソナライズ広告を無効にできます。'
          ]
        },
        {
          title: 'お問い合わせ',
          body: [`プライバシーに関する質問は ${supportEmail} までメールでお問い合わせください。`]
        }
      ]
    },
    terms: {
      title: '利用規約',
      description: 'UI UX Pro Max Skill のウェブサイトおよびドキュメントを利用する際の規約です。',
      updated: '最終更新日: 2026 年 5 月 4 日',
      sections: [
        {
          title: '本サイトの利用',
          body: [
            '本サイトは UI UX Pro Max Skill のドキュメント、例、参考情報を提供します。プロジェクトリポジトリのライセンス条件に従い、公開コンテンツを評価、学習、実装支援のために利用できます。',
            '本サイトを不正に利用したり、可用性を妨げたり、意図的に公開されていないシステムやデータへアクセスしようとしたりしないでください。'
          ]
        },
        {
          title: 'コンテンツの正確性',
          body: [
            'ドキュメントを正確で有用な状態に保つよう努めていますが、コンテンツは現状有姿で提供され、時間とともに変更される場合があります。',
            '推奨事項、プロンプト、実装例がご自身のプロジェクトやコンプライアンス要件に適合するかは、利用者自身の責任で確認してください。'
          ]
        },
        {
          title: '第三者サービス',
          body: [
            '本サイトは GitHub、Google、分析プロバイダー、広告パートナーなどの第三者サービスへリンクする場合があります。これらのサービスを利用する際は、それぞれの規約とポリシーが適用されます。'
          ]
        },
        {
          title: 'お問い合わせ',
          body: [`本規約に関する質問は ${supportEmail} までメールでお問い合わせください。`]
        }
      ]
    },
    contact: {
      title: 'お問い合わせ',
      description: 'UI UX Pro Max Skill プロジェクトへの連絡方法。',
      updated: '最終更新日: 2026 年 5 月 4 日',
      sections: [
        {
          title: 'プロジェクトサポート',
          body: [
            'バグ報告、ドキュメントの問題、機能リクエスト、ライセンスに関する質問は、サイトの告知バーからリンクされている GitHub リポジトリをご利用ください。',
            '問題を報告する際は、ページ URL、期待される動作、実際の動作、関連するスクリーンショットやコマンド出力を含めてください。'
          ]
        },
        {
          title: 'プライバシーおよびポリシーに関する質問',
          body: [`プライバシー、広告、ポリシーに関する質問は ${supportEmail} までメールでお問い合わせください。`]
        }
      ]
    },
    about: {
      title: 'このサイトについて',
      description: 'UI UX Pro Max Skill ドキュメントサイトの運営者、公開している内容、コンテンツの作り方について。',
      updated: '最終更新日: 2026 年 6 月 12 日',
      sections: [
        {
          title: 'このサイトは何か',
          body: [
            '本サイトは UI UX Pro Max のドキュメント兼学習サイトです。UI UX Pro Max は、Claude などのコーディングアシスタントに実践的なデザイン知識——厳選された UI スタイル、カラーパレット、フォントペアリング、UX ルール——を与えるオープンソースの AI スキルです。',
            'リファレンスドキュメントに加えて、「AI コーディングツールからプロフェッショナルでアクセシブル、保守可能な UI を引き出す」という具体的な技術について、オリジナル記事とステップバイステップのチュートリアルを公開しています。すべてのコンテンツは英語・中国語・日本語・ベトナム語で提供しています。'
          ]
        },
        {
          title: '運営者',
          body: [
            '本サイトは独立開発者の Zley が構築・運営しています。ブログとチュートリアルの執筆・編集、4 言語版の維持、インフラの運用を担当しています。',
            'ベースとなるスキルはオープンソースプロジェクトであり、本サイトはそのドキュメントと周辺ワークフローの解説を提供します。'
          ]
        },
        {
          title: 'コンテンツの作り方',
          body: [
            '記事は実際の使用から生まれます。公開しているプロンプトパターン、失敗モード、チェックリストは、実際の AI 生成出力に対して使用・検証したうえで記事化しています。',
            '具体的な主張は公開前に検証します——コントラスト比は計算し、プロンプトテンプレートは実行し、コード例はコンパイルを通します。誤りがあった場合は、黙って消すのではなく記事を訂正して経緯を残します。',
            'AI ツールも本サイトの制作工程の一部です——テーマを考えればふさわしいことです——ただし、すべての記事は私たち自身のアウトラインと経験から始まり、掲載される事実はすべて公開前に人間が確認しています。'
          ]
        },
        {
          title: '広告と独立性',
          body: [
            '本サイトはホスティングと開発時間を賄うため、広告（例：Google AdSense）を表示する場合があります。広告主が記事内容に影響を与えることはなく、スポンサー記事や有償レビューは掲載しません。'
          ]
        },
        {
          title: 'お問い合わせ',
          body: [`誤りを見つけた、または取り上げてほしいトピックがある場合は、${supportEmail} までメールいただくか、サイト告知バーからリンクされている GitHub リポジトリで issue を作成してください。`]
        }
      ]
    }
  }
};

export function getLegalPageCopy(page: LegalPage, locale: string): PageCopy {
  const legalLocale: LegalLocale =
    locale === 'zh' || locale === 'vi' || locale === 'ja' ? locale : 'en';
  return copy[legalLocale][page];
}

function renderParagraph(paragraph: string) {
  const [before, after] = paragraph.split(supportEmail);
  if (after === undefined) return paragraph;

  return (
    <>
      {before}
      <a
        href={`mailto:${supportEmail}`}
        className="font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
      >
        {supportEmail}
      </a>
      {after}
    </>
  );
}

export function LegalContent({ page, locale }: { page: LegalPage; locale: string }) {
  const pageCopy = getLegalPageCopy(page, locale);

  return (
    <main className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
      <article className="glass-card p-6 sm:p-10">
        <p className="text-sm font-medium text-blue-600 dark:text-blue-400">{pageCopy.updated}</p>
        <h1 className="mt-3 font-heading text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
          {pageCopy.title}
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">{pageCopy.description}</p>
        <div className="mt-8 space-y-8">
          {pageCopy.sections.map((section) => (
            <section key={section.title}>
              <h2 className="font-heading text-xl font-semibold text-gray-900 dark:text-white">
                {section.title}
              </h2>
              <div className="mt-3 space-y-3 text-gray-600 dark:text-gray-400">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{renderParagraph(paragraph)}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </article>
    </main>
  );
}
