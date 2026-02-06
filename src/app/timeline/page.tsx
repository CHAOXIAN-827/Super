"use client";

import React, { useState } from "react";
import {
  Clock,
  Plus,
  Thermometer,
  Pill,
  Stethoscope,
  StickyNote,
  X,
  Trash2,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  Button,
  Badge,
} from "@/components/ui/base";
import { useAppStore } from "@/stores/app-store";
import type { TimelineEntry } from "@/types/user";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

const typeConfig = {
  symptom: {
    icon: Thermometer,
    label: "症状",
    color: "bg-red-100 text-red-600 border-red-200",
    lineColor: "bg-red-400",
  },
  medication: {
    icon: Pill,
    label: "用药",
    color: "bg-blue-100 text-blue-600 border-blue-200",
    lineColor: "bg-blue-400",
  },
  checkup: {
    icon: Stethoscope,
    label: "检查",
    color: "bg-green-100 text-green-600 border-green-200",
    lineColor: "bg-green-400",
  },
  note: {
    icon: StickyNote,
    label: "笔记",
    color: "bg-amber-100 text-amber-600 border-amber-200",
    lineColor: "bg-amber-400",
  },
};

export default function TimelinePage() {
  const [showForm, setShowForm] = useState(false);
  const { timelineEntries, addTimelineEntry, removeTimelineEntry } =
    useAppStore();

  const sortedEntries = [...timelineEntries].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const handleAdd = (entry: Omit<TimelineEntry, "id">) => {
    addTimelineEntry({ ...entry, id: Date.now().toString() });
    setShowForm(false);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Clock className="h-6 w-6 text-rose-500" />
            病情记录时间线
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            记录症状变化、用药和检查结果
          </p>
        </div>
        <Button
          onClick={() => setShowForm(!showForm)}
          size="sm"
          variant={showForm ? "outline" : "primary"}
        >
          {showForm ? (
            <>
              <X className="h-4 w-4" /> 取消
            </>
          ) : (
            <>
              <Plus className="h-4 w-4" /> 添加记录
            </>
          )}
        </Button>
      </div>

      {/* Add Form */}
      {showForm && <AddEntryForm onSubmit={handleAdd} />}

      {/* Timeline */}
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-gray-200" />

        <div className="space-y-4">
          {sortedEntries.map((entry) => {
            const config = typeConfig[entry.type];
            return (
              <div key={entry.id} className="relative flex gap-4 pl-0">
                {/* Dot */}
                <div
                  className={cn(
                    "relative z-10 flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center border-2 bg-white",
                    config.color
                  )}
                >
                  <config.icon className="h-4 w-4" />
                </div>

                {/* Content */}
                <Card className="flex-1">
                  <CardContent className="py-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Badge
                            variant="default"
                            className={cn("text-xs", config.color)}
                          >
                            {config.label}
                          </Badge>
                          <span className="text-xs text-gray-400">
                            {formatDate(entry.date)}
                          </span>
                        </div>
                        <h4 className="font-medium text-gray-900 text-sm">
                          {entry.title}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {entry.description}
                        </p>
                        {entry.tags && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {entry.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-xs text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => removeTimelineEntry(entry.id)}
                        className="text-gray-300 hover:text-red-500 transition-colors p-1"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>

        {sortedEntries.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <Clock className="h-12 w-12 mx-auto mb-3 text-gray-300" />
            <p>暂无记录，点击上方按钮添加</p>
          </div>
        )}
      </div>
    </div>
  );
}

function AddEntryForm({
  onSubmit,
}: {
  onSubmit: (entry: Omit<TimelineEntry, "id">) => void;
}) {
  const [type, setType] = useState<TimelineEntry["type"]>("symptom");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit({
      type,
      title: title.trim(),
      description: description.trim(),
      date: new Date().toISOString(),
      tags: tags
        .split(/[,，\s]+/)
        .map((t) => t.trim())
        .filter(Boolean),
    });
  };

  return (
    <Card className="mb-6">
      <CardContent className="py-4">
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Type Select */}
          <div className="flex gap-2">
            {(Object.entries(typeConfig) as [TimelineEntry["type"], typeof typeConfig.symptom][]).map(
              ([key, config]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setType(key)}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                    type === key ? config.color : "bg-gray-100 text-gray-500"
                  )}
                >
                  <config.icon className="h-3.5 w-3.5" />
                  {config.label}
                </button>
              )
            )}
          </div>

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="标题，例如：下午出现头晕"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
            required
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="详细描述..."
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
            rows={2}
          />
          <input
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="标签（用逗号分隔），例如：头晕,血压"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
          />
          <Button type="submit" disabled={!title.trim()}>
            添加记录
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
