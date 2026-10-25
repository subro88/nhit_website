import React from 'react';

export default function OutcomesSection() {
  return (
    <section className="wp-block-group edu-outcomes">
      <div className="wp-block-group edu-container edu-outcomes__grid">
        {/* 3D Isometric Bar Chart */}
        <div className="edu-chart3d edu-reveal is-inview is-live" data-edu-parallax="-0.06">
          <div className="edu-chart3d__scene">
            <div className="edu-bar3d">
              <div className="edu-bar3d__value">80–85%</div>
              <div
                className="edu-bar3d__shaft"
                style={
                  {
                    '--bar-h': '88%',
                    '--bar-color': '#ff3115',
                    '--bar-color-dark': '#c92810',
                  } as React.CSSProperties
                }
              />
              <div className="edu-bar3d__label">Placed / B.Tech*</div>
            </div>

            <div className="edu-bar3d">
              <div className="edu-bar3d__value">15–20%</div>
              <div
                className="edu-bar3d__shaft"
                style={
                  {
                    '--bar-h': '52%',
                    '--bar-color': '#00bcd4',
                    '--bar-color-dark': '#0097a7',
                  } as React.CSSProperties
                }
              />
              <div className="edu-bar3d__label">Higher Studies</div>
            </div>

            <div className="edu-bar3d">
              <div className="edu-bar3d__value">14+</div>
              <div
                className="edu-bar3d__shaft"
                style={
                  {
                    '--bar-h': '66%',
                    '--bar-color': '#92278f',
                    '--bar-color-dark': '#6e1d6c',
                  } as React.CSSProperties
                }
              />
              <div className="edu-bar3d__label">Batches Out</div>
            </div>
          </div>
        </div>

        {/* Narrative & Outcomes Breakdown */}
        <div className="wp-block-group edu-reveal is-inview">
          <p className="edu-sec-head__kicker">Outcomes Infographic</p>
          <h2 className="edu-sec-head__title" style={{ color: '#fff' }}>
            Where an NHIT Diploma Takes You
          </h2>

          <div className="edu-outcome-list">
            <div className="edu-outcome">
              <div className="edu-outcome__icon">💼</div>
              <div>
                <div className="edu-outcome__title">Industry Placement — 80–85%*</div>
                <p className="edu-outcome__text">
                  Of interested, eligible students — recruited by Tata Motors, L&amp;T, John Deere,
                  JBM, TIL India, Anand Group, Sharda Motors and more.
                </p>
              </div>
            </div>

            <div className="edu-outcome">
              <div className="edu-outcome__icon">🎓</div>
              <div>
                <div className="edu-outcome__title">B.Tech Lateral Entry — 15–20%</div>
                <p className="edu-outcome__text">
                  Diploma holders enter B.E./B.Tech second year directly — the classic
                  diploma-to-degree ladder.
                </p>
              </div>
            </div>

            <div className="edu-outcome">
              <div className="edu-outcome__icon">🚀</div>
              <div>
                <div className="edu-outcome__title">Foundership via NEN</div>
                <p className="edu-outcome__text">
                  A few alumni have launched auto-sector enterprises, backed by our National
                  Entrepreneurship Network MoU.
                </p>
              </div>
            </div>
          </div>

          <p
            style={{
              fontFamily: "'Roboto Condensed', sans-serif",
              fontSize: '0.8rem',
              color: '#8a8a8a',
              marginTop: '1rem',
            }}
          >
            * As recorded by NHIT placement records (2022) — batch-wise figures available at the T&amp;P
            cell.
          </p>
        </div>
      </div>
    </section>
  );
}
