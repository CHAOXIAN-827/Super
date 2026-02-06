"use client";

import React, { useState } from "react";
import {
  BookOpen,
  Bookmark,
  BookmarkCheck,
  UtensilsCrossed,
  Pill,
  Dumbbell,
  HeartPulse,
  Search,
} from "lucide-react";
import { Card, CardContent, Button, Badge } from "@/components/ui/base";
import { useAppStore } from "@/stores/app-store";
import type { KnowledgeCard } from "@/types/user";
import { cn } from "@/lib/utils";

const categoryConfig = {
  diet: { icon: UtensilsCrossed, label: "饮食指南", color: "bg-green-100 text-green-700" },
  medication: { icon: Pill, label: "用药须知", color: "bg-blue-100 text-blue-700" },
  exercise: { icon: Dumbbell, label: "运动建议", color: "bg-orange-100 text-orange-700" },
  care: { icon: HeartPulse, label: "日常护理", color: "bg-rose-100 text-rose-700" },
};

type FilterCategory = "all" | KnowledgeCard["category"] | "saved";

export default function KnowledgePage() {
  const [filter, setFilter] = useState<FilterCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { knowledgeCards, toggleSaveCard } = useAppStore();

  const filteredCards = knowledgeCards.filter((card) => {
    if (filter === "saved" && !card.saved) return false;
    if (filter !== "all" && filter !== "saved" && card.category !== filter)
      return false;
    if (
      searchQuery &&
      !card.title.includes(searchQuery) &&
      !card.content.includes(searchQuery) &&
      !card.tags.some((t) => t.includes(searchQuery))
    )
      return false;
    return true;
  });

  const filters: { key: FilterCategory; label: string }[] = [
    { key: "all", label: "全部" },
    { key: "diet", label: "饮食" },
    { key: "medication", label: "用药" },
    { key: "exercise", label: "运动" },
    { key: "care", label: "护理" },
    { key: "saved", label: "已收藏" },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-amber-500" />
          护理知识库
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          实用的健康护理知识，帮助您更好地照顾家人
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="搜索知识卡片..."
          className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
        />
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={cn(
              "px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
              filter === f.key
                ? "bg-amber-100 text-amber-700"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {filteredCards.map((card) => {
          const config = categoryConfig[card.category];
          return (
            <Card key={card.id}>
              <CardContent className="pt-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        "inline-flex items-center justify-center w-8 h-8 rounded-lg",
                        config.color
                      )}
                    >
                      <config.icon className="h-4 w-4" />
                    </div>
                    <Badge
                      variant="default"
                      className={cn("text-xs", config.color)}
                    >
                      {config.label}
                    </Badge>
                  </div>
                  <button
                    onClick={() => toggleSaveCard(card.id)}
                    className="text-gray-400 hover:text-amber-500 transition-colors"
                  >
                    {card.saved ? (
                      <BookmarkCheck className="h-5 w-5 text-amber-500" />
                    ) : (
                      <Bookmark className="h-5 w-5" />
                    )}
                  </button>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {card.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {card.content}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {card.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredCards.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <BookOpen className="h-12 w-12 mx-auto mb-3 text-gray-300" />
          <p>没有找到匹配的知识卡片</p>
        </div>
      )}
    </div>
  );
}
