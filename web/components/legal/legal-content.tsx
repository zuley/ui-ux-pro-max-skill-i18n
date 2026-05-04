type LegalPage = 'privacy' | 'terms' | 'contact';
type LegalLocale = 'en' | 'zh' | 'vi';

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
    }
  },
  vi: {
    privacy: {
      title: 'Privacy Policy',
      description: 'How UI UX Pro Max Skill handles analytics, advertising, cookies, and contact information.',
      updated: 'Last updated: May 4, 2026',
      sections: []
    },
    terms: {
      title: 'Terms of Use',
      description: 'Terms for using the UI UX Pro Max Skill website and documentation.',
      updated: 'Last updated: May 4, 2026',
      sections: []
    },
    contact: {
      title: 'Contact',
      description: 'Ways to reach the UI UX Pro Max Skill project.',
      updated: 'Last updated: May 4, 2026',
      sections: []
    }
  }
};

copy.vi.privacy.sections = copy.en.privacy.sections;
copy.vi.terms.sections = copy.en.terms.sections;
copy.vi.contact.sections = copy.en.contact.sections;

export function getLegalPageCopy(page: LegalPage, locale: string): PageCopy {
  const legalLocale: LegalLocale = locale === 'zh' || locale === 'vi' ? locale : 'en';
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
