// Two layouts of the systems diagram: a wide one (the flow runs left to right) and a tall one for
// phones (it runs top to bottom). Same drawing, same clock; only the coordinates change.

export type Pt = [number, number]

interface Outcome {
  pos: Pt
  end: Pt
  label: string
  sub: string[]
  label_at: Pt
  anchor: 'start' | 'middle' | 'end'
}

export interface Layout {
  vb: [number, number]
  flow: Pt
  k: number
  jitter: number
  nodeR: number
  outR: number
  laptop: { cx: number; cy: number; w: number; h: number }
  meDy: number
  gate: Pt
  ports: Pt[]
  out: Pt
  nodes: { chaos: Pt; order: Pt; off1: Pt; off2: Pt }[]
  label: [number, number, 'start' | 'middle' | 'end']
  orphan: { chaos: Pt; order: Pt }
  bottleneck: { text: Pt; arrow: string }
  outcomes: Outcome[]
  edgeLabels: [number, number, 'start' | 'middle' | 'end'][]
  balance: Pt
  bubble: { x: number; y: number; w: number; h: number; tail: [Pt, Pt, Pt] }
  caps: { mess: Pt; end: Pt; endAnchor: 'start' | 'middle' | 'end'; process: Pt }
  procLine: [number, number, number]
  moments: Pt[]
  momentScale: number
}

const wide: Layout = {
  vb: [1100, 620],
  flow: [1, 0],
  k: 120,
  jitter: 5,
  nodeR: 6,
  outR: 27,
  laptop: { cx: 500, cy: 236, w: 136, h: 88 },
  meDy: 48,
  gate: [432, 236],
  ports: [0, 1, 2, 3, 4, 5].map((i): Pt => [432, 202 + i * 13.6]),
  out: [572, 246],
  nodes: [
    { chaos: [190, 64], order: [190, 90], off1: [120, 90], off2: [-160, 110] },
    { chaos: [262, 150], order: [190, 150], off1: [-60, 140], off2: [90, -150] },
    { chaos: [215, 238], order: [190, 210], off1: [150, -110], off2: [-120, -60] },
    { chaos: [300, 310], order: [190, 270], off1: [-90, -120], off2: [150, 120] },
    { chaos: [185, 384], order: [190, 330], off1: [170, 60], off2: [-170, -90] },
    { chaos: [290, 420], order: [190, 390], off1: [60, -160], off2: [110, 150] },
  ],
  label: [-12, 4, 'end'],
  orphan: { chaos: [360, 452], order: [190, 450] },
  bottleneck: { text: [326, 182], arrow: 'M388 190 C404 198 416 210 426 226' },
  outcomes: [
    {
      pos: [800, 125],
      end: [773, 128],
      label: 'Happy users',
      sub: ['simpler journeys,', 'less friction,', 'better experiences'],
      label_at: [800, 36],
      anchor: 'middle',
    },
    {
      pos: [935, 245],
      end: [908, 245],
      label: 'Happy business',
      sub: ['stronger conversion,', 'retention, revenue', 'and growth'],
      label_at: [974, 240],
      anchor: 'start',
    },
    {
      pos: [800, 365],
      end: [773, 361],
      label: 'Happy stakeholders',
      sub: ['aligned priorities,', 'clear direction,', 'things actually shipped'],
      label_at: [800, 412],
      anchor: 'middle',
    },
  ],
  edgeLabels: [
    [12, -8, 'start'],
    [12, 16, 'start'],
    [-12, -24, 'end'],
  ],
  balance: [866, 222],
  bubble: {
    x: 580,
    y: 124,
    w: 138,
    h: 40,
    tail: [
      [596, 164],
      [612, 164],
      [572, 198],
    ],
  },
  caps: { mess: [40, 28], end: [1080, 24], endAnchor: 'end', process: [40, 474] },
  procLine: [40, 1060, 486],
  moments: [0, 1, 2, 3, 4, 5].map((i): Pt => [110 + i * 176, 534]),
  momentScale: 1,
}

const tall: Layout = {
  vb: [380, 910],
  flow: [0, 1],
  k: 70,
  jitter: 3.5,
  nodeR: 5,
  outR: 23,
  laptop: { cx: 190, cy: 340, w: 120, h: 78 },
  meDy: 48,
  gate: [190, 301],
  ports: [0, 1, 2, 3, 4, 5].map((i): Pt => [150 + i * 18, 301]),
  out: [190, 406],
  nodes: [
    { chaos: [40, 60], order: [20, 72], off1: [60, 40], off2: [-70, 50] },
    { chaos: [180, 110], order: [200, 72], off1: [-50, 60], off2: [40, -60] },
    { chaos: [24, 150], order: [20, 118], off1: [70, -40], off2: [-50, -30] },
    { chaos: [150, 205], order: [200, 118], off1: [-60, -50], off2: [60, 60] },
    { chaos: [60, 235], order: [20, 164], off1: [80, 30], off2: [-80, -40] },
    { chaos: [190, 170], order: [200, 164], off1: [30, -70], off2: [50, 70] },
  ],
  label: [11, 4, 'start'],
  orphan: { chaos: [250, 246], order: [20, 212] },
  bottleneck: { text: [226, 282], arrow: 'M224 286 C212 288 204 292 197 298' },
  outcomes: [
    {
      pos: [84, 520],
      end: [84, 497],
      label: 'Happy users',
      sub: ['simpler journeys,', 'less friction'],
      label_at: [84, 562],
      anchor: 'middle',
    },
    {
      pos: [296, 520],
      end: [296, 497],
      label: 'Happy business',
      sub: ['conversion,', 'retention, growth'],
      label_at: [296, 562],
      anchor: 'middle',
    },
    {
      pos: [190, 640],
      end: [190, 617],
      label: 'Happy stakeholders',
      sub: ['aligned, shipped'],
      label_at: [190, 684],
      anchor: 'middle',
    },
  ],
  edgeLabels: [
    [0, -8, 'middle'],
    [12, 2, 'start'],
    [-12, 2, 'end'],
  ],
  balance: [190, 500],
  bubble: {
    x: 258,
    y: 316,
    w: 112,
    h: 40,
    tail: [
      [260, 330],
      [260, 344],
      [250, 340],
    ],
  },
  caps: { mess: [10, 22], end: [10, 462], endAnchor: 'start', process: [20, 742] },
  procLine: [20, 360, 752],
  moments: [
    [64, 790],
    [190, 790],
    [316, 790],
    [64, 866],
    [190, 866],
    [316, 866],
  ],
  momentScale: 0.9,
}

export const systemsLayouts = { wide, tall }
