import { ImageResponse } from 'next/og';

export const SOCIAL_IMAGE_ALT =
  'UI UX Pro Max Skill — Design Intelligence for AI Assistants';
export const SOCIAL_IMAGE_SIZE = { width: 1200, height: 630 };

export function createSocialImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 78px',
          color: '#f8fafc',
          background:
            'radial-gradient(circle at 18% 12%, rgba(37,99,235,.55), transparent 38%), radial-gradient(circle at 82% 75%, rgba(249,115,22,.38), transparent 38%), #0f172a'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, fontSize: 28, fontWeight: 700 }}>
          <div
            style={{
              width: 54,
              height: 54,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 16,
              color: '#ffffff',
              background: 'linear-gradient(135deg, #2563eb, #f97316)'
            }}
          >
            UI
          </div>
          UI UX Pro Max Skill
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ display: 'flex', flexDirection: 'column', fontSize: 76, lineHeight: 1.05, fontWeight: 800, letterSpacing: '-3px' }}>
            <span>Design intelligence</span>
            <span>for AI assistants</span>
          </div>
          <div style={{ display: 'flex', gap: 18, fontSize: 25, color: '#cbd5e1' }}>
            67 UI styles · 161 palettes · 99 UX guidelines · 16 tech stacks
          </div>
        </div>
      </div>
    ),
    SOCIAL_IMAGE_SIZE
  );
}
