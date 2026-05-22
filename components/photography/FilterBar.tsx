"use client";

import { getCategories } from "@/lib/photography";
import type { Category } from "@/lib/photography";
import { cn } from "@/lib/utils";

export interface FilterBarProps {
  months: string[];
  activeCategory: Category | "all";
  activeMonth: string | "all";
  sortOrder: "newest" | "oldest";
  onCategoryChange: (cat: Category | "all") => void;
  onMonthChange: (month: string | "all") => void;
  onSortChange: (sort: "newest" | "oldest") => void;
}

const pillBase =
  "shrink-0 rounded-full px-3 py-1 text-[11px] tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[rgb(var(--fg))]";
const activePill = "bg-[rgb(var(--fg))] text-[rgb(var(--bg))]";
const inactivePill = "border border-[rgb(var(--border))] text-[rgb(var(--muted))] hover:border-[rgb(var(--fg))] hover:text-[rgb(var(--fg))]";

export function FilterBar({
  months,
  activeCategory,
  activeMonth,
  sortOrder,
  onCategoryChange,
  onMonthChange,
  onSortChange,
}: FilterBarProps) {
  const categories = getCategories();

  return (
    <section className="sticky top-16 z-30 border-b border-[rgb(var(--border))] bg-[rgb(var(--bg))]/95 backdrop-blur-sm">
      <div className="space-y-2.5 px-4 py-3 md:px-6">
        <div className="flex gap-2 overflow-x-auto pb-0.5" aria-label="Photo categories">
          <button
            type="button"
            aria-pressed={activeCategory === "all"}
            onClick={() => onCategoryChange("all")}
            className={cn(pillBase, activeCategory === "all" ? activePill : inactivePill)}
          >
            All
          </button>

          {categories.map((category) => (
            <button
              key={category.value}
              type="button"
              aria-pressed={activeCategory === category.value}
              onClick={() => onCategoryChange(category.value)}
              className={cn(pillBase, activeCategory === category.value ? activePill : inactivePill)}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 overflow-hidden">
          <div className="flex shrink-0 gap-2" aria-label="Photo sort order">
            <button
              type="button"
              aria-pressed={sortOrder === "newest"}
              onClick={() => onSortChange("newest")}
              className={cn(pillBase, sortOrder === "newest" ? activePill : inactivePill)}
            >
              Newest
            </button>
            <button
              type="button"
              aria-pressed={sortOrder === "oldest"}
              onClick={() => onSortChange("oldest")}
              className={cn(pillBase, sortOrder === "oldest" ? activePill : inactivePill)}
            >
              Oldest
            </button>
          </div>

          <div className="h-4 w-px shrink-0 bg-[rgb(var(--border))]" aria-hidden="true" />

          <div className="hide-scrollbar flex min-w-0 flex-1 gap-2 overflow-x-auto" aria-label="Photo months">
            <button
              type="button"
              aria-pressed={activeMonth === "all"}
              onClick={() => onMonthChange("all")}
              className={cn(pillBase, activeMonth === "all" ? activePill : inactivePill)}
            >
              All
            </button>

            {months.map((month) => (
              <button
                key={month}
                type="button"
                aria-pressed={activeMonth === month}
                onClick={() => onMonthChange(month)}
                className={cn(pillBase, activeMonth === month ? activePill : inactivePill)}
              >
                {month}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
