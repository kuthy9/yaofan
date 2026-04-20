export type ProjectDefinition = {
  id: "refusal" | "persona" | "excuse";
  name: string;
  englishName: string;
  tagline: string;
  version: string;
  nextUpdate: string;
  vitality: number;
  tone: string;
  promptLabel: string;
  promptPlaceholder: string;
  presetPrompts: string[];
};

export type SupportTier = {
  id: "single_project" | "all_access";
  name: string;
  englishName: string;
  price: string;
  description: string;
  cta: string;
  badge?: string;
};

export type HowItWorksStep = {
  id: string;
  title: string;
  description: string;
};

export const brandCopy = {
  eyebrow: "yaofan.io",
  headline: "让好玩的AI项目别饿死",
  subheadline:
    "试玩奇怪但有用的AI工具。喜欢哪个，就给它一口饭，让它继续更新。",
  supportLine:
    "Give interesting AI projects a bite so they stay live.",
};

export const projects: ProjectDefinition[] = [
  {
    id: "refusal",
    name: "AI拒绝生成器",
    englishName: "AI Refusal Generator",
    tagline: "针对不同情况生成巧妙、自然、不过分心虚的拒绝消息。",
    version: "v0.9 beta",
    nextUpdate: "下次更新：老板局 / 团建 / 暧昧邀约三套语气包",
    vitality: 78,
    tone: "礼貌但不窝囊",
    promptLabel: "你想拒绝什么",
    promptPlaceholder: "例如：周六不想参加临时团建，但又不想显得太硬。",
    presetPrompts: [
      "周末不想参加团建",
      "不想接这个免费帮忙",
      "不想去一个很尴尬的饭局",
    ],
  },
  {
    id: "persona",
    name: "AI 人设包装器",
    englishName: "AI Persona Polisher",
    tagline: "把平平无奇的自我描述，抛光成不同风格的人设简介。",
    version: "v1.2",
    nextUpdate: "下次更新：加上求职版 / 社交版 / 抽象版一键切换",
    vitality: 64,
    tone: "包装但不发癫",
    promptLabel: "先描述一下你自己",
    promptPlaceholder: "例如：会写点代码，喜欢猫，做产品时偶尔焦虑。",
    presetPrompts: [
      "会写代码，也会写一点文案",
      "一个喜欢做产品的普通人",
      "自由职业，爱猫，脑子转得很快",
    ],
  },
  {
    id: "excuse",
    name: "AI借口生成器",
    englishName: "AI Excuse Generator",
    tagline: "为日常小场面生成自然借口，体面跑路，不必解释过量。",
    version: "v0.7 alpha",
    nextUpdate: "下次更新：增加上班迟到 / 临时失约 / 家庭局三类模板",
    vitality: 52,
    tone: "真诚到像真的",
    promptLabel: "你需要一个什么借口",
    promptPlaceholder: "例如：今天不想出门，但朋友已经在催了。",
    presetPrompts: [
      "今天不想出门见朋友",
      "需要延后一个交付时间",
      "想优雅取消一场语音电话",
    ],
  },
];

export const howItWorksSteps: HowItWorksStep[] = [
  {
    id: "play",
    title: "试玩",
    description: "先点开项目，现场感受这个 AI 小玩意到底有没有点意思。",
  },
  {
    id: "feed",
    title: "投喂",
    description: "你喜欢哪个，就给它一口饭。钱会直接变成模型额度、API 账单和下个版本。",
  },
  {
    id: "unlock",
    title: "解锁更新",
    description: "被投喂得越像样，更新就越不拖延，项目也更有机会真的活下来。",
  },
];

export const supportTiers: SupportTier[] = [
  {
    id: "single_project",
    name: "单项目续命",
    englishName: "Feed one project",
    price: "CAD $15",
    description: "给一个项目喂饱它，让它别停在半成品状态。",
    cta: "给它一口饭",
  },
  {
    id: "all_access",
    name: "全站通行证",
    englishName: "Full access pass",
    price: "CAD $40",
    description: "不选边站，直接支持整个奇怪工具宇宙继续生长。",
    cta: "我全都要",
    badge: "最像真爱粉",
  },
];
