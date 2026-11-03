import siteCopy from '@/lib/site-copy.json';
import { OFFICIAL_PROJECT_URL, SITE_ISSUES_URL } from '@/lib/site-config';
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
      "title": "Contact",
      "description": "For translation or website errors, use the site feedback link below. For skill or CLI defects, use the upstream project link. This site does not provide official product support.",
      "updated": "2026-11-03",
      "sections": [
        {
          "title": "Unofficial multilingual translation",
          "body": [
            "An unofficial multilingual translation site for UI UX Pro Max Skill. We translate and organize documentation; the original authors maintain the skill, CLI and datasets. We are not affiliated with or endorsed by the original project.",
            "For translation or website errors, use the site feedback link below. For skill or CLI defects, use the upstream project link. This site does not provide official product support."
          ]
        }
      ]
    },
    about: {
      "title": "About This Site",
      "description": "An unofficial multilingual translation site for UI UX Pro Max Skill. We translate and organize documentation; the original authors maintain the skill, CLI and datasets. We are not affiliated with or endorsed by the original project.",
      "updated": "2026-11-03",
      "sections": [
        {
          "title": "Independent translation maintainers",
          "body": [
            "An unofficial multilingual translation site for UI UX Pro Max Skill. We translate and organize documentation; the original authors maintain the skill, CLI and datasets. We are not affiliated with or endorsed by the original project."
          ]
        },
        {
          "title": "Unofficial multilingual translation",
          "body": [
            "We distinguish upstream references from site learning material. Where the original publication source cannot be verified, the page says so. AI tools may assist translation and consistency checks; this is not a claim of review or endorsement by the original authors."
          ]
        },
        {
          "title": "About This Site",
          "body": [
            "For translation or website errors, use the site feedback link below. For skill or CLI defects, use the upstream project link. This site does not provide official product support."
          ]
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
      "title": "संपर्क",
      "description": "अनुवाद या वेबसाइट की त्रुटि के लिए नीचे साइट फ़ीडबैक लिंक इस्तेमाल करें। Skill या CLI की समस्या मूल परियोजना को भेजें। यह साइट आधिकारिक उत्पाद समर्थन नहीं देती।",
      "updated": "2026-11-03",
      "sections": [
        {
          "title": "अनौपचारिक बहुभाषी अनुवाद",
          "body": [
            "यह UI UX Pro Max Skill की अनौपचारिक बहुभाषी अनुवाद साइट है। हम दस्तावेज़ों का अनुवाद और संकलन करते हैं; skill, CLI और datasets मूल लेखक संभालते हैं। साइट मूल परियोजना से संबद्ध या आधिकारिक रूप से समर्थित नहीं है।",
            "अनुवाद या वेबसाइट की त्रुटि के लिए नीचे साइट फ़ीडबैक लिंक इस्तेमाल करें। Skill या CLI की समस्या मूल परियोजना को भेजें। यह साइट आधिकारिक उत्पाद समर्थन नहीं देती।"
          ]
        }
      ]
    },
    about: {
      "title": "इस site के बारे में",
      "description": "यह UI UX Pro Max Skill की अनौपचारिक बहुभाषी अनुवाद साइट है। हम दस्तावेज़ों का अनुवाद और संकलन करते हैं; skill, CLI और datasets मूल लेखक संभालते हैं। साइट मूल परियोजना से संबद्ध या आधिकारिक रूप से समर्थित नहीं है।",
      "updated": "2026-11-03",
      "sections": [
        {
          "title": "स्वतंत्र अनुवाद अनुरक्षक",
          "body": [
            "यह UI UX Pro Max Skill की अनौपचारिक बहुभाषी अनुवाद साइट है। हम दस्तावेज़ों का अनुवाद और संकलन करते हैं; skill, CLI और datasets मूल लेखक संभालते हैं। साइट मूल परियोजना से संबद्ध या आधिकारिक रूप से समर्थित नहीं है।"
          ]
        },
        {
          "title": "अनौपचारिक बहुभाषी अनुवाद",
          "body": [
            "हम मूल संदर्भ और साइट की अध्ययन सामग्री अलग रखते हैं। मूल प्रकाशन स्रोत सत्यापित न हो तो पेज पर बताया जाता है। AI अनुवाद और संगति जाँच में सहायता कर सकता है; यह मूल लेखक की समीक्षा या स्वीकृति का दावा नहीं है।"
          ]
        },
        {
          "title": "इस site के बारे में",
          "body": [
            "अनुवाद या वेबसाइट की त्रुटि के लिए नीचे साइट फ़ीडबैक लिंक इस्तेमाल करें। Skill या CLI की समस्या मूल परियोजना को भेजें। यह साइट आधिकारिक उत्पाद समर्थन नहीं देती।"
          ]
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
      "title": "联系",
      "description": "翻译或网页错误请使用下方本站反馈入口；技能或 CLI 缺陷请使用上游项目入口。本站不提供官方产品支持。",
      "updated": "2026-11-03",
      "sections": [
        {
          "title": "非官方多语言翻译",
          "body": [
            "本站是 UI UX Pro Max Skill 的非官方多语言翻译站，负责翻译与整理文档。技能、CLI 和数据集由原作者维护；本站与原项目无隶属关系，也不代表官方。",
            "翻译或网页错误请使用下方本站反馈入口；技能或 CLI 缺陷请使用上游项目入口。本站不提供官方产品支持。"
          ]
        }
      ]
    },
    about: {
      "title": "关于本站",
      "description": "本站是 UI UX Pro Max Skill 的非官方多语言翻译站，负责翻译与整理文档。技能、CLI 和数据集由原作者维护；本站与原项目无隶属关系，也不代表官方。",
      "updated": "2026-11-03",
      "sections": [
        {
          "title": "独立翻译维护者",
          "body": [
            "本站是 UI UX Pro Max Skill 的非官方多语言翻译站，负责翻译与整理文档。技能、CLI 和数据集由原作者维护；本站与原项目无隶属关系，也不代表官方。"
          ]
        },
        {
          "title": "非官方多语言翻译",
          "body": [
            "本站区分上游参考资料与本站学习材料；原始发表来源无法核实时，会在页面说明。AI 工具可辅助翻译与一致性检查，这不代表原作者审核或背书。"
          ]
        },
        {
          "title": "关于本站",
          "body": [
            "翻译或网页错误请使用下方本站反馈入口；技能或 CLI 缺陷请使用上游项目入口。本站不提供官方产品支持。"
          ]
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
      "title": "Liên hệ",
      "description": "Lỗi bản dịch hoặc trang web: dùng liên kết phản hồi của trang bên dưới. Lỗi skill hoặc CLI: dùng liên kết dự án gốc. Trang này không cung cấp hỗ trợ sản phẩm chính thức.",
      "updated": "2026-11-03",
      "sections": [
        {
          "title": "Bản dịch đa ngôn ngữ không chính thức",
          "body": [
            "Đây là trang dịch đa ngôn ngữ không chính thức về UI UX Pro Max Skill. Trang dịch và sắp xếp tài liệu; tác giả gốc duy trì skill, CLI và dữ liệu. Trang không trực thuộc hay được dự án gốc bảo trợ.",
            "Lỗi bản dịch hoặc trang web: dùng liên kết phản hồi của trang bên dưới. Lỗi skill hoặc CLI: dùng liên kết dự án gốc. Trang này không cung cấp hỗ trợ sản phẩm chính thức."
          ]
        }
      ]
    },
    about: {
      "title": "Về trang này",
      "description": "Đây là trang dịch đa ngôn ngữ không chính thức về UI UX Pro Max Skill. Trang dịch và sắp xếp tài liệu; tác giả gốc duy trì skill, CLI và dữ liệu. Trang không trực thuộc hay được dự án gốc bảo trợ.",
      "updated": "2026-11-03",
      "sections": [
        {
          "title": "Nhóm duy trì bản dịch độc lập",
          "body": [
            "Đây là trang dịch đa ngôn ngữ không chính thức về UI UX Pro Max Skill. Trang dịch và sắp xếp tài liệu; tác giả gốc duy trì skill, CLI và dữ liệu. Trang không trực thuộc hay được dự án gốc bảo trợ."
          ]
        },
        {
          "title": "Bản dịch đa ngôn ngữ không chính thức",
          "body": [
            "Trang phân biệt tài liệu gốc và nội dung học tập. Nếu chưa xác minh được nguồn xuất bản ban đầu, trang sẽ ghi rõ. AI có thể hỗ trợ dịch và kiểm tra nhất quán; điều đó không có nghĩa tác giả gốc đã duyệt hay bảo trợ."
          ]
        },
        {
          "title": "Về trang này",
          "body": [
            "Lỗi bản dịch hoặc trang web: dùng liên kết phản hồi của trang bên dưới. Lỗi skill hoặc CLI: dùng liên kết dự án gốc. Trang này không cung cấp hỗ trợ sản phẩm chính thức."
          ]
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
      "title": "お問い合わせ",
      "description": "翻訳・サイトの誤りは下の当サイト窓口へ、スキル・CLI の不具合は上流プロジェクトへご報告ください。当サイトは公式サポートを提供しません。",
      "updated": "2026-11-03",
      "sections": [
        {
          "title": "非公式多言語翻訳",
          "body": [
            "当サイトは UI UX Pro Max Skill の非公式多言語翻訳サイトです。文書の翻訳・整理を行い、スキル、CLI、データセットは原作者が管理します。原プロジェクトとは無関係で、公式の承認を受けていません。",
            "翻訳・サイトの誤りは下の当サイト窓口へ、スキル・CLI の不具合は上流プロジェクトへご報告ください。当サイトは公式サポートを提供しません。"
          ]
        }
      ]
    },
    about: {
      "title": "このサイトについて",
      "description": "当サイトは UI UX Pro Max Skill の非公式多言語翻訳サイトです。文書の翻訳・整理を行い、スキル、CLI、データセットは原作者が管理します。原プロジェクトとは無関係で、公式の承認を受けていません。",
      "updated": "2026-11-03",
      "sections": [
        {
          "title": "独立した翻訳管理者",
          "body": [
            "当サイトは UI UX Pro Max Skill の非公式多言語翻訳サイトです。文書の翻訳・整理を行い、スキル、CLI、データセットは原作者が管理します。原プロジェクトとは無関係で、公式の承認を受けていません。"
          ]
        },
        {
          "title": "非公式多言語翻訳",
          "body": [
            "上流の参考資料と当サイトの学習資料を区別します。初出が確認できない場合はページに明記します。AI が翻訳や整合性確認を補助することがありますが、原作者のレビューや承認を意味しません。"
          ]
        },
        {
          "title": "このサイトについて",
          "body": [
            "翻訳・サイトの誤りは下の当サイト窓口へ、スキル・CLI の不具合は上流プロジェクトへご報告ください。当サイトは公式サポートを提供しません。"
          ]
        }
      ]
    }

  }
};

export function getLegalPageCopy(page: LegalPage, locale: string): PageCopy {
  const legalLocale: LegalLocale =
    locale === 'zh' || locale === 'vi' || locale === 'ja' || locale === 'hi' ? locale : 'en';
  const pageCopy = copy[legalLocale][page];
  return {
    ...pageCopy,
    description: page === 'privacy' || page === 'terms'
      ? `${siteCopy[legalLocale].shortIdentity} — ${pageCopy.title}`
      : page === 'about' ? siteCopy[legalLocale].shortIdentity : pageCopy.description,
  };
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
  const identity = siteCopy[(locale in siteCopy ? locale : 'en') as keyof typeof siteCopy];

  return (
    <main className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
      <article className="glass-card p-6 sm:p-10">
        <p className="text-sm font-medium text-blue-600 dark:text-blue-400">{pageCopy.updated}</p>
        <h1 className="mt-3 font-heading text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
          {pageCopy.title}
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">{pageCopy.description}</p>
        {page === 'privacy' || page === 'terms' ? <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">{identity.identity}</p> : null}
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
        <div className="mt-6 flex flex-wrap gap-4 text-sm underline underline-offset-4">
          <a href={SITE_ISSUES_URL}>GitHub · {identity.maintainer}</a>
          <a href={`${OFFICIAL_PROJECT_URL}/issues`}>GitHub · Next Level Builder</a>
          <a href={`mailto:${supportEmail}`}>{supportEmail}</a>
        </div>
      </article>
    </main>
  );
}
