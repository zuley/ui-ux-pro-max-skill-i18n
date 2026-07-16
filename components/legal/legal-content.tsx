type LegalPage = 'privacy' | 'terms' | 'contact' | 'about';
type LegalLocale = 'en' | 'zh' | 'vi' | 'ja' | 'hi';

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
      description: 'What this unofficial translation site provides and how translated content is maintained.',
      updated: 'Last updated: July 16, 2026',
      sections: [
        {
          title: 'What this site is',
          body: [
            'This is an unofficial multilingual translation and learning companion for UI UX Pro Max, an open-source AI skill that gives coding assistants like Claude practical design intelligence: curated UI styles, color palettes, font pairings, and UX rules they can apply when generating interfaces.',
            'The site translates and organizes reference docs, articles, and step-by-step tutorials about getting professional, accessible, maintainable UI out of AI coding tools. Content is available in English, Chinese, Japanese, Vietnamese, and Hindi.'
          ]
        },
        {
          title: 'Who runs it',
          body: [
            'This site is maintained by an independent translation team. It is not affiliated with or endorsed by the original UI UX Pro Max Skill project.',
            'The original project and skill are maintained by their original authors; this site only translates and organizes related content.'
          ]
        },
        {
          title: 'How translations are made',
          body: [
            'Content is translated from source material while preserving technical meaning, code, commands, and product terminology.',
            'Translations are checked for missing sections, broken links, malformed code blocks, and terminology drift before publishing. Errors are corrected rather than quietly removed.',
            'AI tools may assist with translation and consistency checks, but the translation team reviews content before publication.'
          ]
        },
        {
          title: 'Advertising and independence',
          body: [
            'The site may show ads (for example through Google AdSense) to cover hosting and maintenance costs. Advertisers have no influence on translation choices; we do not publish sponsored posts or paid reviews.'
          ]
        },
        {
          title: 'Contact',
          body: [`Found an error, or want to suggest a topic? Email ${supportEmail}, or open an issue on the GitHub repository linked in the site announcement bar.`]
        }
      ]
    }
  },
  hi: {
    privacy: {
      title: 'गोपनीयता नीति',
      description: 'UI UX Pro Max Skill analytics, विज्ञापन, cookies और संपर्क जानकारी को कैसे संभालती है।',
      updated: 'अंतिम अपडेट: 4 मई 2026',
      sections: [
        {
          title: 'हम कौन-सी जानकारी एकत्र करते हैं',
          body: [
            'यह एक सार्वजनिक documentation और product website है। इसे देखने के लिए account, login या payment details की आवश्यकता नहीं है।',
            'यदि आप हमसे संपर्क करते हैं, तो हमें वह जानकारी मिल सकती है जो आप स्वयं देते हैं—जैसे आपका नाम, email address, संदेश और उससे जुड़ा technical context।'
          ]
        },
        {
          title: 'Analytics और विज्ञापन तकनीकें',
          body: [
            'Website के समग्र उपयोग को समझने के लिए हम Google Analytics इस्तेमाल करते हैं। Google AdSense सक्षम होने पर Google और अन्य third-party vendors विज्ञापन दिखाने, मापने और वैयक्तिक बनाने के लिए cookies, web beacons, IP addresses, device identifiers और मिलती-जुलती तकनीकों का उपयोग कर सकते हैं।',
            'इस website पर विज्ञापन दिखाए जाने के कारण third parties आपके browser में cookies रख या पढ़ सकती हैं, अथवा web beacons और IP addresses इस्तेमाल कर सकती हैं।'
          ]
        },
        {
          title: 'जानकारी का उपयोग कैसे होता है',
          body: [
            'Documentation, navigation, सामग्री की गुणवत्ता और website performance सुधारने के लिए हम aggregate analytics इस्तेमाल करते हैं।',
            'जहाँ अनुमति हो, advertising partners विज्ञापन पहुँचाने, धोखाधड़ी रोकने, measurement, reporting और personalized या non-personalized advertising के लिए data इस्तेमाल कर सकते हैं।'
          ]
        },
        {
          title: 'आपके विकल्प',
          body: [
            'आप अपने browser settings में cookies नियंत्रित कर सकते हैं। Partner sites पर Google data कैसे इस्तेमाल करता है, यह https://policies.google.com/technologies/partner-sites पर पढ़ें।',
            'जहाँ उपलब्ध हो, https://adssettings.google.com/ पर Google Ads Settings के जरिए personalized advertising से opt out कर सकते हैं।'
          ]
        },
        {
          title: 'संपर्क',
          body: [`गोपनीयता से जुड़े प्रश्नों के लिए ${supportEmail} पर email करें।`]
        }
      ]
    },
    terms: {
      title: 'उपयोग की शर्तें',
      description: 'UI UX Pro Max Skill website और documentation के उपयोग की शर्तें।',
      updated: 'अंतिम अपडेट: 4 मई 2026',
      sections: [
        {
          title: 'इस site का उपयोग',
          body: [
            'यह site UI UX Pro Max Skill के documentation, examples और references देती है। Project repository में दी गई license terms के अधीन आप सार्वजनिक सामग्री का मूल्यांकन, सीखने और implementation support के लिए उपयोग कर सकते हैं।',
            'Site का दुरुपयोग न करें, उसकी उपलब्धता में बाधा न डालें और जानबूझकर सार्वजनिक न किए गए systems या data तक पहुँचने की कोशिश न करें।'
          ]
        },
        {
          title: 'सामग्री की शुद्धता',
          body: [
            'हम documentation को सही और उपयोगी रखने का प्रयास करते हैं, लेकिन सामग्री “जैसी है” के आधार पर दी जाती है और समय के साथ बदल सकती है।',
            'यह जाँचना आपकी ज़िम्मेदारी है कि कोई भी recommendation, prompt या implementation example आपके project और compliance requirements के अनुकूल है।'
          ]
        },
        {
          title: 'Third-party सेवाएँ',
          body: [
            'Site पर GitHub, Google, analytics providers या advertising partners जैसी third-party सेवाओं के links हो सकते हैं। उन सेवाओं का उपयोग करते समय उनकी अपनी terms और policies लागू होती हैं।'
          ]
        },
        {
          title: 'संपर्क',
          body: [`इन शर्तों से जुड़े प्रश्नों के लिए ${supportEmail} पर email करें।`]
        }
      ]
    },
    contact: {
      title: 'संपर्क',
      description: 'UI UX Pro Max Skill project से संपर्क करने के तरीके।',
      updated: 'अंतिम अपडेट: 4 मई 2026',
      sections: [
        {
          title: 'Project support',
          body: [
            'Bug report, documentation issue, feature request या licensing question के लिए site के announcement bar में linked GitHub repository इस्तेमाल करें।',
            'Issue बताते समय page URL, अपेक्षित व्यवहार, वास्तविक व्यवहार और उपयोगी screenshot या command output अवश्य जोड़ें।'
          ]
        },
        {
          title: 'गोपनीयता और policy संबंधी प्रश्न',
          body: [`गोपनीयता, विज्ञापन या policy से जुड़े प्रश्नों के लिए ${supportEmail} पर email करें।`]
        }
      ]
    },
    about: {
      title: 'इस site के बारे में',
      description: 'यह अनौपचारिक translation site क्या उपलब्ध कराती है और translated content कैसे maintain होता है।',
      updated: 'अंतिम अपडेट: 16 जुलाई 2026',
      sections: [
        {
          title: 'यह site क्या है',
          body: [
            'यह UI UX Pro Max की एक अनौपचारिक बहुभाषी translation और learning companion site है। UI UX Pro Max एक open-source AI skill है, जो Claude जैसे coding assistants को व्यावहारिक design intelligence देती है—चुनी हुई UI styles, color palettes, font pairings और UX rules जिन्हें वे interfaces बनाते समय लागू कर सकते हैं।',
            'यह site reference docs, articles और चरण-दर-चरण tutorials का अनुवाद और organization करती है, ताकि AI coding tools से professional, accessible और maintainable UI बनाने की जानकारी उपलब्ध हो। Content English, Chinese, Japanese, Vietnamese और Hindi में उपलब्ध है।'
          ]
        },
        {
          title: 'इसे कौन चलाता है',
          body: [
            'यह site एक independent translation team द्वारा maintain की जाती है। इसका मूल UI UX Pro Max Skill project से कोई affiliation नहीं है और मूल project ने इसे endorse नहीं किया है।',
            'मूल project और skill का रखरखाव उनके original authors करते हैं; यह site केवल संबंधित content का अनुवाद और organization करती है।'
          ]
        },
        {
          title: 'अनुवाद कैसे तैयार किए जाते हैं',
          body: [
            'Content का अनुवाद source material से किया जाता है, और technical meaning, code, commands तथा product terminology को यथासंभव जस का तस रखा जाता है।',
            'प्रकाशन से पहले missing sections, broken links, malformed code blocks और terminology drift की जाँच की जाती है। गलती मिलने पर translation को चुपचाप हटाने के बजाय सुधारा जाता है।',
            'AI tools translation और consistency checks में सहायता कर सकते हैं, लेकिन प्रकाशन से पहले translation team content को review करती है।'
          ]
        },
        {
          title: 'विज्ञापन और स्वतंत्रता',
          body: [
            'Hosting और maintenance costs पूरा करने के लिए site पर विज्ञापन (जैसे Google AdSense) दिख सकते हैं। Translation choices पर advertisers का कोई प्रभाव नहीं होता; हम sponsored posts या paid reviews प्रकाशित नहीं करते।'
          ]
        },
        {
          title: 'संपर्क',
          body: [`कोई गलती मिली या किसी विषय का सुझाव देना है? ${supportEmail} पर email करें, या site announcement bar में linked GitHub repository पर issue खोलें।`]
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
      description: '介绍这个非官方翻译站提供的内容，以及译文如何维护。',
      updated: '最后更新：2026 年 7 月 16 日',
      sections: [
        {
          title: '这个网站是什么',
          body: [
            '本站是 UI UX Pro Max 的非官方多语言翻译与学习站。UI UX Pro Max 是一个开源 AI 技能，为 Claude 等编程助手提供可落地的设计知识：精选的 UI 风格、配色方案、字体配对和 UX 规则，让 AI 在生成界面时有据可依。',
            '本站翻译并整理参考文档、文章和分步教程，主题是如何让 AI 编程工具产出专业、可访问、可维护的界面。内容提供英文、中文、日文、越南文和印地文五个版本。'
          ]
        },
        {
          title: '谁在运营',
          body: [
            '本站由独立翻译团队维护，与 UI UX Pro Max Skill 原项目不存在隶属关系，也未获得原项目的官方背书。',
            '原项目及其技能由原作者维护；本站仅负责相关内容的翻译与整理。'
          ]
        },
        {
          title: '译文如何产生',
          body: [
            '内容以原始材料为依据进行翻译，并尽量保持技术含义、代码、命令和产品术语不变。',
            '译文发布前会检查章节缺失、链接失效、代码块格式错误和术语漂移。发现错误时会直接修正，而不是悄悄删除。',
            'AI 工具可能参与翻译和一致性检查，但内容在发布前会由翻译团队复核。'
          ]
        },
        {
          title: '广告与独立性',
          body: [
            '本站可能展示广告（例如通过 Google AdSense）以覆盖托管和维护成本。广告主不影响翻译取舍；本站不发布软文或付费测评。'
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
      description: 'Trang dịch không chính thức này cung cấp gì và nội dung dịch được duy trì như thế nào.',
      updated: 'Cập nhật lần cuối: 16 tháng 7, 2026',
      sections: [
        {
          title: 'Trang web này là gì',
          body: [
            'Đây là trang dịch đa ngôn ngữ và học tập không chính thức cho UI UX Pro Max — một AI skill mã nguồn mở cung cấp tri thức thiết kế thực dụng cho các trợ lý lập trình như Claude: các style UI tuyển chọn, bảng màu, cặp font và quy tắc UX để AI áp dụng khi sinh giao diện.',
            'Trang dịch và sắp xếp tài liệu tham khảo, bài viết cùng tutorial từng bước về cách tạo giao diện chuyên nghiệp, dễ tiếp cận và dễ bảo trì bằng công cụ lập trình AI. Nội dung có năm ngôn ngữ: Anh, Trung, Nhật, Việt và Hindi.'
          ]
        },
        {
          title: 'Ai vận hành',
          body: [
            'Trang được duy trì bởi một nhóm dịch thuật độc lập. Trang không liên kết và không được dự án UI UX Pro Max Skill gốc chứng thực.',
            'Dự án và skill gốc do các tác giả ban đầu duy trì; trang này chỉ dịch và sắp xếp nội dung liên quan.'
          ]
        },
        {
          title: 'Bản dịch được tạo ra thế nào',
          body: [
            'Nội dung được dịch từ tài liệu nguồn đồng thời giữ nguyên ý nghĩa kỹ thuật, code, câu lệnh và thuật ngữ sản phẩm.',
            'Trước khi đăng, bản dịch được kiểm tra phần còn thiếu, liên kết hỏng, code block sai định dạng và thuật ngữ bị lệch. Lỗi sẽ được sửa thay vì âm thầm xóa.',
            'Công cụ AI có thể hỗ trợ dịch và kiểm tra tính nhất quán, nhưng nhóm dịch thuật sẽ rà soát nội dung trước khi xuất bản.'
          ]
        },
        {
          title: 'Quảng cáo và tính độc lập',
          body: [
            'Trang có thể hiển thị quảng cáo (ví dụ qua Google AdSense) để trang trải chi phí hosting và bảo trì. Nhà quảng cáo không ảnh hưởng đến lựa chọn dịch thuật; chúng tôi không đăng bài tài trợ hay review trả phí.'
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
      description: 'この非公式翻訳サイトが提供する内容と、翻訳コンテンツの管理方法について。',
      updated: '最終更新日: 2026 年 7 月 16 日',
      sections: [
        {
          title: 'このサイトは何か',
          body: [
            '本サイトは UI UX Pro Max の非公式な多言語翻訳・学習サイトです。UI UX Pro Max は、Claude などのコーディングアシスタントに実践的なデザイン知識——厳選された UI スタイル、カラーパレット、フォントペアリング、UX ルール——を与えるオープンソースの AI スキルです。',
            'AI コーディングツールからプロフェッショナルでアクセシブル、保守可能な UI を引き出すためのリファレンスドキュメント、記事、ステップバイステップのチュートリアルを翻訳・整理しています。コンテンツは英語・中国語・日本語・ベトナム語・ヒンディー語で提供しています。'
          ]
        },
        {
          title: '運営者',
          body: [
            '本サイトは独立した翻訳チームが運営しています。UI UX Pro Max Skill の原プロジェクトとは提携関係になく、公式な承認も受けていません。',
            '原プロジェクトとスキルは原作者が管理しており、本サイトは関連コンテンツの翻訳と整理のみを行います。'
          ]
        },
        {
          title: '翻訳の作り方',
          body: [
            '原資料の技術的な意味、コード、コマンド、製品用語を保ちながら翻訳します。',
            '公開前に、セクションの欠落、リンク切れ、コードブロックの書式不備、用語のずれを確認します。誤りが見つかった場合は、黙って削除せず修正します。',
            'AI ツールが翻訳や一貫性の確認を補助する場合がありますが、公開前に翻訳チームが内容を確認します。'
          ]
        },
        {
          title: '広告と独立性',
          body: [
            '本サイトはホスティングと保守費用を賄うため、広告（例：Google AdSense）を表示する場合があります。広告主が翻訳方針に影響を与えることはなく、スポンサー記事や有償レビューは掲載しません。'
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
    locale === 'zh' || locale === 'vi' || locale === 'ja' || locale === 'hi' ? locale : 'en';
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
