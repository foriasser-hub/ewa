import { ImageResponse } from 'next/og';
import { siteConfig } from '@/lib/site-config';

/**
 * Default Open Graph image — generated at build time by Next.js.
 * Returns a 1200×630 PNG with the brand wordmark on the navy gradient.
 *
 * Pages can override this image by exporting their own openGraph.images
 * via buildMetadata(). The default URL exposed by Next is /opengraph-image.
 */
export const runtime = 'edge';
export const alt = `${siteConfig.name} — Centre de formation IA pour débutants`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px',
          background:
            'radial-gradient(circle at 25% 20%, rgba(255,255,255,0.18), transparent 55%), linear-gradient(135deg, #0A1F44 0%, #102A56 60%, #1E3A8A 100%)',
          color: 'white',
          fontFamily: 'Inter, system-ui, sans-serif',
        }}
      >
        {/* Top badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: 'white',
              color: '#0A1F44',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 26,
              fontWeight: 800,
              letterSpacing: -1,
            }}
          >
            A·IA
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 24, fontWeight: 700, letterSpacing: -0.5 }}>
              AKADEMIA IA
            </span>
            <span
              style={{
                fontSize: 14,
                textTransform: 'uppercase',
                letterSpacing: 6,
                color: '#A9B7E0',
              }}
            >
              Madagasikara
            </span>
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <span
            style={{
              fontSize: 14,
              textTransform: 'uppercase',
              letterSpacing: 6,
              color: '#A9B7E0',
            }}
          >
            Centre de formation IA · débutants bienvenus
          </span>
          <span
            style={{
              fontSize: 76,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -2,
            }}
          >
            Apprenez l&apos;IA, même en partant de zéro.
          </span>
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}
        >
          <span style={{ fontSize: 22, color: '#D6DEF2' }}>akademia-ia.mg</span>
          <div style={{ display: 'flex', gap: 12, fontSize: 18 }}>
            <span
              style={{
                padding: '8px 14px',
                borderRadius: 999,
                background: 'rgba(255,255,255,0.12)',
              }}
            >
              IA pour étudiants
            </span>
            <span
              style={{
                padding: '8px 14px',
                borderRadius: 999,
                background: 'rgba(255,255,255,0.12)',
              }}
            >
              Vibe coding
            </span>
            <span
              style={{
                padding: '8px 14px',
                borderRadius: 999,
                background: 'rgba(255,255,255,0.12)',
              }}
            >
              Design IA
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
