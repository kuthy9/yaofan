import type { ProjectDefinition } from "@/data/siteContent";

export type PlaygroundResult = {
  label: string;
  text: string;
};

const trimInput = (value: string) => value.trim() || "这个场面";

export function generatePlaygroundResults(
  project: ProjectDefinition,
  rawInput: string,
): PlaygroundResult[] {
  const input = trimInput(rawInput);

  switch (project.id) {
    case "refusal":
      return [
        {
          label: "柔和版",
          text: `这次先不过去了，${input} 这件事我得留点体力处理。等我把手头这阵子扛过去，再认真约一次，不想用一个敷衍状态出现。`,
        },
        {
          label: "体面版",
          text: `我认真想了一下，这次还是先不参加。不是对人有意见，主要是 ${input} 这个场景里我很难给出一个好状态，硬去反而显得不走心。`,
        },
        {
          label: "朋友可发版",
          text: `今天先让我撤退一下。${input} 我现在真的接不太住，改天我请你喝东西，补一个更像样的见面。`,
        },
      ];
    case "persona":
      return [
        {
          label: "社交版",
          text: `我是那种把 ${input} 这类普通描述，慢慢做成个人风格的人。比起喊口号，我更擅长把想法落成能被人真正用起来的东西。`,
        },
        {
          label: "求职版",
          text: `围绕 ${input} 这条线，我形成了“能理解问题，也能把方案做出来”的工作方式。既能处理细节，也能把表达打磨得让人愿意继续聊下去。`,
        },
        {
          label: "互联网版",
          text: `表面上是 ${input}，实际上是一个对产品气味、表达方式和用户瞬间反应都很敏感的人，擅长把平的东西做得有记忆点。`,
        },
      ];
    case "excuse":
      return [
        {
          label: "自然版",
          text: `我这边临时有点状况，${input} 这件事今天可能接不上了。不是故意放鸽子，主要是现在硬上只会更狼狈。`,
        },
        {
          label: "上班可用版",
          text: `我刚刚重新排了一下手头优先级，发现 ${input} 会直接影响今天后面的安排。为了不把节奏拖得更乱，我想先往后顺一顺。`,
        },
        {
          label: "半真半假版",
          text: `今天状态确实有点掉线，尤其是 ${input} 这个点突然叠上来，我现在更适合低调处理问题，不太适合正常社交输出。`,
        },
      ];
  }
}
