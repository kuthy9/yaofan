import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Play, MessageCircleMore } from "lucide-react";

import { projects, type ProjectDefinition } from "@/data/siteContent";
import { generatePlaygroundResults, type PlaygroundResult } from "@/lib/projectPlayground";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

type LaunchMode = "blank" | "preset";

function ProjectPlaygroundDialog({
  project,
  mode,
  open,
  onOpenChange,
}: {
  project: ProjectDefinition | null;
  mode: LaunchMode;
  open: boolean;
  onOpenChange: (value: boolean) => void;
}) {
  const defaultInput = useMemo(() => {
    if (!project) return "";
    return mode === "preset" ? project.presetPrompts[0] : "";
  }, [mode, project]);

  const [input, setInput] = useState("");
  const [results, setResults] = useState<PlaygroundResult[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    if (!open || !project) return;
    setInput(defaultInput);
    setResults(defaultInput ? generatePlaygroundResults(project, defaultInput) : []);
    setFeedback(null);
  }, [defaultInput, open, project]);

  if (!project) return null;

  const runGenerator = () => {
    setResults(generatePlaygroundResults(project, input));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl border-[#d8d0c7] bg-[#fffaf4] p-0 shadow-[0_30px_90px_rgba(54,39,27,0.15)]">
        <div className="grid gap-0 md:grid-cols-[0.94fr_1.06fr]">
          <div className="border-b border-[#e6ddd2] bg-[linear-gradient(180deg,rgba(255,244,224,0.9),rgba(255,250,244,0.95))] p-6 md:border-b-0 md:border-r">
            <DialogHeader className="space-y-3 text-left">
              <div className="flex items-center gap-2">
                <Badge className="border-0 bg-[#1f1a16] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#fff4dc]">
                  Live demo
                </Badge>
                <Badge variant="outline" className="border-[#d4c6b3] bg-white/80 text-[#6b5a46]">
                  {project.version}
                </Badge>
              </div>
              <DialogTitle className="text-2xl font-black tracking-tight text-[#211b16]">
                {project.name}
              </DialogTitle>
              <DialogDescription className="text-sm leading-6 text-[#6c5e4e]">
                {project.tagline}
              </DialogDescription>
            </DialogHeader>

            <div className="mt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="playground-input" className="text-sm font-semibold text-[#44372d]">
                  {project.promptLabel}
                </Label>
                <Input
                  id="playground-input"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder={project.promptPlaceholder}
                  className="h-12 border-[#d8cbbd] bg-white text-[#241d18] placeholder:text-[#9c8e7d]"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {project.presetPrompts.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setInput(preset)}
                    className="rounded-full border border-[#dccfbe] bg-white px-3 py-1.5 text-xs font-medium text-[#5c4b3a] transition hover:border-[#1f1a16] hover:text-[#1f1a16]"
                  >
                    {preset}
                  </button>
                ))}
              </div>

              <Button
                size="lg"
                onClick={runGenerator}
                className="h-12 w-full rounded-full bg-[#1f1a16] text-[#fff4dc] hover:bg-[#3a2d22]"
              >
                <Sparkles className="mr-1" />
                生成一下
              </Button>
            </div>
          </div>

          <div className="p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#7e6a56]">
                输出结果
              </h3>
              <span className="text-xs text-[#9b8a77]">{project.tone}</span>
            </div>

            <div className="mt-4 space-y-3">
              {results.length > 0 ? (
                results.map((result) => (
                  <div
                    key={result.label}
                    className="rounded-3xl border border-[#ece1d6] bg-white p-4 text-left shadow-[0_10px_24px_rgba(31,26,22,0.05)]"
                  >
                    <div className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#a1886d]">
                      {result.label}
                    </div>
                    <p className="text-sm leading-7 text-[#2f271f]">{result.text}</p>
                  </div>
                ))
              ) : (
                <div className="rounded-3xl border border-dashed border-[#d9cbbb] bg-[#fff6ea] p-6 text-sm leading-7 text-[#7e6a56]">
                  先给它一个场景。这不是全能模型，只是一个被喂得还算体面的互联网小工具。
                </div>
              )}
            </div>

            <div className="mt-5 rounded-3xl border border-[#ece1d6] bg-[#fff8ef] p-4">
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#4a3c30]">
                <MessageCircleMore className="size-4" />
                反馈一下
              </div>
              <div className="flex flex-wrap gap-2">
                {["有点意思", "再怪一点", "可以上线"].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setFeedback(item)}
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                      feedback === item
                        ? "bg-[#1f1a16] text-[#fff4dc]"
                        : "border border-[#d7cab8] bg-white text-[#6e5b49] hover:border-[#1f1a16]"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <p className="mt-3 text-xs text-[#8e7a67]">
                {feedback
                  ? `已记录你的主观互联网意见：${feedback}。`
                  : "选一个态度，模拟一下用户已经给出反应。"}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function ProjectShowcase() {
  const [selectedProject, setSelectedProject] = useState<ProjectDefinition | null>(null);
  const [launchMode, setLaunchMode] = useState<LaunchMode>("blank");
  const [isOpen, setIsOpen] = useState(false);

  const openProject = (project: ProjectDefinition, mode: LaunchMode) => {
    setSelectedProject(project);
    setLaunchMode(mode);
    setIsOpen(true);
  };

  return (
    <section id="projects" className="px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#9b856d]">
              第一批活口
            </p>
            <h2 className="text-3xl font-black tracking-tight text-[#211b16] md:text-5xl">
              先试，再决定要不要给它一口饭
            </h2>
            <p className="text-base leading-7 text-[#6d5e4f]">
              每个项目都还在生长中，不装成平台，也不假装自己已经是成品。
            </p>
          </div>
          <div className="rounded-full border border-[#ded0bf] bg-white/80 px-4 py-2 text-sm text-[#6b5a48] shadow-[0_8px_24px_rgba(34,26,19,0.05)]">
            点击卡片里的 <span className="font-semibold text-[#231c16]">试用</span> 或{" "}
            <span className="font-semibold text-[#231c16]">体验一下</span> 直接试玩
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
            >
              <Card className="group h-full rounded-[28px] border-[#e3d6c7] bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(255,248,240,0.96))] shadow-[0_16px_44px_rgba(34,26,19,0.06)] transition hover:-translate-y-1 hover:shadow-[0_22px_60px_rgba(34,26,19,0.1)]">
                <CardHeader className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2">
                      <CardTitle className="text-2xl font-black tracking-tight text-[#201a15]">
                        {project.name}
                      </CardTitle>
                      <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#9a8268]">
                        {project.englishName}
                      </p>
                    </div>
                    <Badge variant="outline" className="border-[#d7c7b4] bg-[#fff8ef] text-[#5e4c3c]">
                      {project.version}
                    </Badge>
                  </div>
                  <p className="min-h-16 text-sm leading-7 text-[#615245]">{project.tagline}</p>
                </CardHeader>

                <CardContent className="space-y-5">
                  <div className="rounded-3xl border border-[#eee3d6] bg-[#fffdf9] p-4">
                    <div className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.22em] text-[#8a745d]">
                      <span>生存条</span>
                      <span>{project.vitality}%</span>
                    </div>
                    <Progress
                      value={project.vitality}
                      className="h-2.5 rounded-full bg-[#efe3d3] [&>div]:bg-[linear-gradient(90deg,#211b16,#dd7f45)]"
                    />
                    <p className="mt-3 text-sm text-[#6e5e50]">{project.nextUpdate}</p>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      size="lg"
                      className="flex-1 rounded-full bg-[#211b16] text-[#fff4dc] hover:bg-[#3a2d22]"
                      onClick={() => openProject(project, "blank")}
                    >
                      <Play className="mr-1" />
                      试用
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="flex-1 rounded-full border-[#d6c7b6] bg-white text-[#2a221b] hover:bg-[#fff4e7]"
                      onClick={() => openProject(project, "preset")}
                    >
                      体验一下
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <ProjectPlaygroundDialog
        project={selectedProject}
        mode={launchMode}
        open={isOpen}
        onOpenChange={setIsOpen}
      />
    </section>
  );
}
