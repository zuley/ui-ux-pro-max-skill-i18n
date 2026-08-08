# Homepage sponsor banner design QA

## Comparison target

- Source visual truth: `/var/folders/wm/0c7nxd913gg54qwbqgdyw07m0000gn/T/codex-clipboard-a340b627-2508-4a4f-95e3-94165f7123b6.png`
- Final implementation: `/Users/zley/.codex/visualizations/2026/08/08/019fdf85-759c-7563-ad13-35dc6bc24d54/homepage-sponsor-banner-text-only-final.png`
- Combined comparison: `/Users/zley/.codex/visualizations/2026/08/08/019fdf85-759c-7563-ad13-35dc6bc24d54/homepage-sponsor-banner-text-only-final-comparison.png`
- Mobile light capture: `/Users/zley/.codex/visualizations/2026/08/08/019fdf85-759c-7563-ad13-35dc6bc24d54/homepage-perk-label-no-background-mobile-320.png`
- Mobile dark capture: `/Users/zley/.codex/visualizations/2026/08/08/019fdf85-759c-7563-ad13-35dc6bc24d54/homepage-sponsor-banner-text-only-mobile-dark.png`
- Chinese perk-label capture: `/Users/zley/.codex/visualizations/2026/08/08/019fdf85-759c-7563-ad13-35dc6bc24d54/homepage-perk-label-no-background-zh.png`
- State: English homepage, light theme for the source comparison; all five homepages checked at 320, 375, and 390px widths, with retained light/dark evidence from the preceding responsive pass.

## Normalization

- Source pixels: 1472 x 533.
- Browser CSS viewport: 1472 x 533.
- Browser capture pixels: 1457 x 528 due to the in-app browser capture area.
- The final browser capture was normalized to 1472 x 533 for the combined comparison. The scale difference was below 1.1% on either axis.
- Mobile CSS viewport: 390 x 844. No density normalization was needed for the responsive checks.

## Full-view comparison evidence

- The source marks an empty area immediately below the fixed navigation and immediately above the tool badges.
- The final banner occupies that area at `y=113–209`, while the navigation ends at `y=95` and the first badge begins at `y=240`.
- The final desktop gap is 18px after navigation and 31px before the badges, so the banner does not overlap navigation or Hero content.
- The top announcement bar contains only the unofficial-site disclosure and official repository link; the sponsor link is confined to the Hero.

## Focused region evidence

A separate crop was not needed because the complete navigation, banner, sponsor label, CTA, tool badges, and the start of the Hero heading are all readable in the 1472 x 533 combined comparison. Mobile captures separately verify the denser responsive state.

## Required fidelity surfaces

- Fonts and typography: Existing site fonts, weights, line heights, and text hierarchy are preserved. The sponsor label is smaller than the offer and CTA, and all five localized messages wrap without truncation.
- Spacing and layout rhythm: The banner matches the marked slot with an 896 x 96 desktop frame. Desktop and mobile both maintain positive gaps between navigation, banner, and badges.
- Colors and visual tokens: The advertisement has no background, border, blur, or shadow. It relies on the site's blue sponsor label and CTA plus higher-contrast gray/slate text, while retaining a keyboard-only focus ring.
- Image quality and asset fidelity: No image asset is required by the requested text-only banner. Existing logos and tool icons remain unchanged.
- Copy and content: The banner presents a localized benefit label, localized offer copy, CTA, Chinese landing-page routing, international routing, and sponsored link attributes.

## Findings and iteration history

1. P2 desktop overlap: The first implementation placed the banner at the correct `y=113–209` position, but the tool badges began at `y=192`.
   - Fix: Increased desktop Hero content top spacing by 48px.
   - Post-fix evidence: Badges begin at `y=240`, leaving a 31px gap.
2. P2 mobile overlap: The first mobile pass placed the banner bottom at `y=220.25` while badges began at `y=208`.
   - Fix: Increased mobile Hero content top spacing by 32px.
   - Post-fix evidence: Badges begin at `y=240`, leaving a 19.75px gap with no horizontal overflow.
3. P2 visual prominence: User feedback identified the original gray border and border-strengthening hover state as too abrupt for the open Hero area.
   - Fix: Replaced the gray border with a translucent white outline, removed hover border emphasis, reduced the glass surface opacity, and changed to a wider low-opacity ambient shadow.
   - Post-fix evidence: Desktop and mobile light/dark captures show a readable, bounded sponsor area without a visible hard edge; position and spacing metrics are unchanged.
4. P2 visual direction: Follow-up feedback requested no visual container at all and stronger copy prominence.
   - Fix: Removed the remaining background, outline, backdrop blur, radius, and shadow. Increased the offer to 16px/600 on desktop and 14px/600 on mobile; increased CTA weight to 700.
   - Post-fix evidence: Computed styles report transparent background, 0px border, and no shadow in both themes. Desktop retains a 31px gap before badges; mobile retains an 8px link-box gap with no overflow or visible overlap.
5. P2 content framing: Follow-up feedback requested presenting the promotion as a benefit rather than an advertisement.
   - Fix: Localized the visible and accessible label as `Perk` / `福利` / `Ưu đãi` / `特典` / `लाभ`. Kept the machine-readable `sponsored` link relation unchanged.
   - Post-fix evidence: All five homepages render the localized benefit label and retain `rel="nofollow sponsored noopener noreferrer"`.
6. P2 narrow-screen overlap: At 320px, the English promotion link extended to `y=245.75` while tool badges began at `y=240`, causing the higher-z-index link to capture clicks over the top of the badges.
   - Fix: Increased the Hero content offset below 400px from 160px to 176px.
   - Post-fix evidence: At 320px, the English link now ends at `y=241.75` and badges begin at `y=256`, leaving a 14.25px gap. Every other locale leaves a 28px gap; no tested width has horizontal overflow.
7. P2 background removal: The promotion container was transparent, but the benefit label still used a filled blue pill.
   - Fix: Removed the label background, radius, and padding; retained blue color and bold type for prominence.
   - Post-fix evidence: Computed label background is transparent on every tested locale and viewport; desktop and 320px captures retain clear label prominence.

## Responsive and interaction checks

- Verified English, Chinese, Vietnamese, Japanese, and Hindi homepages at 320, 375, and 390px widths.
- Verified Chinese uses the Lingma landing page and all other locales use the Qoder landing page.
- Verified `rel="nofollow sponsored noopener noreferrer"` on every locale.
- Verified the banner is absent from documentation pages and absent from the fixed announcement bar.
- Verified light/dark theme switching and visible banner contrast.
- Did not click the live sponsor link during QA; its rendered URL, label, target, and relation attributes were inspected instead.
- Browser console: no new errors. The existing AdSense `data-nscript` warning remains unrelated to this change.

## Final result

final result: passed
