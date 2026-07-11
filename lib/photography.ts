// Photography data for the Night City Archive
// Categories assigned via visual inspection of each image.
// To update categories, edit the `categories` array per entry.

export type Category = "portrait" | "artsy" | "environment" | "cars" | "bw";

export interface Photo {
  filename: string;
  date: Date;
  month: string; // "Sep 2025", "Oct 2025", etc.
  categories: Category[];
  url: string;
}

// Parse "Cyberpunk2077 YYYY-MM-DD HH-MM-SS_###.png" → Date
function parseFilenameDate(filename: string): Date {
  // e.g. "Cyberpunk2077 2025-09-06 02-18-12_853.png"
  const match = filename.match(/(\d{4})-(\d{2})-(\d{2}) (\d{2})-(\d{2})-(\d{2})/);
  if (!match) return new Date(0);
  const [, year, month, day, hour, min, sec] = match;
  return new Date(Date.UTC(
    parseInt(year),
    parseInt(month) - 1,
    parseInt(day),
    parseInt(hour),
    parseInt(min),
    parseInt(sec),
  ));
}

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function toMonthLabel(date: Date): string {
  return `${MONTH_NAMES[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
}

// Raw data — filename + categories (visually inspected)
const RAW: { filename: string; categories: Category[] }[] = [
  { filename: "Cyberpunk2077 2025-09-06 02-18-12_853.png",   categories: ["artsy", "portrait"] },
  { filename: "Cyberpunk2077 2025-09-20 21-54-35_883.png",   categories: ["artsy", "portrait"] },
  { filename: "Cyberpunk2077 2025-09-20 23-03-56_668.png",   categories: ["artsy", "portrait"] },
  { filename: "Cyberpunk2077 2025-09-21 16-42-37_750.png",   categories: ["artsy", "portrait"] },
  { filename: "Cyberpunk2077 2025-09-23 02-15-39_599.png",   categories: ["portrait", "artsy"] },
  { filename: "Cyberpunk2077 2025-09-25 01-51-26_705.png",   categories: ["artsy", "portrait"] },
  { filename: "Cyberpunk2077 2025-10-02 00-36-21_871.png",   categories: ["artsy"]        },
  { filename: "Cyberpunk2077 2025-10-04 00-56-02_467.png",   categories: ["portrait", "artsy"] },
  { filename: "Cyberpunk2077 2025-10-07 01-49-22_101.png",   categories: ["portrait"]     },
  { filename: "Cyberpunk2077 2025-10-10 19-09-31_696.png",   categories: ["artsy", "portrait"] },
  { filename: "Cyberpunk2077 2025-10-10 22-25-06_554.png",   categories: ["artsy", "portrait"] },
  { filename: "Cyberpunk2077 2025-10-13 19-17-21_022.png",   categories: ["artsy"]        },
  { filename: "Cyberpunk2077 2025-10-13 20-49-01_479.png",   categories: ["portrait", "artsy"] },
  { filename: "Cyberpunk2077 2025-10-15 01-34-55_223.png",   categories: ["portrait", "artsy"] },
  { filename: "Cyberpunk2077 2025-10-16 01-55-27_646.png",   categories: ["portrait", "artsy"] },
  { filename: "Cyberpunk2077 2025-10-20 01-20-03_814.png",   categories: ["artsy", "portrait"] },
  { filename: "Cyberpunk2077 2025-10-20 02-01-19_810.png",   categories: ["portrait"]     },
  { filename: "Cyberpunk2077 2025-10-21 01-06-37_284.png",   categories: ["portrait"]     },
  { filename: "Cyberpunk2077 2025-10-22 00-13-46_647.png",   categories: ["cars"]         },
  { filename: "Cyberpunk2077 2025-10-23 02-30-08_029.png",   categories: ["portrait"]     },
  { filename: "Cyberpunk2077 2025-10-25 16-14-00_479.png",   categories: ["cars"]         },
  { filename: "Cyberpunk2077 2025-10-25 23-53-04_716.png",   categories: ["artsy"]        },
  { filename: "Cyberpunk2077 2025-10-25 23-54-54_974.png",   categories: ["artsy"]        },
  { filename: "Cyberpunk2077 2025-10-28 02-06-55_888.png",   categories: ["artsy"]        },
  { filename: "Cyberpunk2077 2025-11-01 22-03-55_699.png",   categories: ["environment"]  },
  { filename: "Cyberpunk2077 2025-11-02 17-04-31_455.png",   categories: ["portrait"]     },
  { filename: "Cyberpunk2077 2025-11-04 01-35-26_469.png",   categories: ["portrait"]     },
  { filename: "Cyberpunk2077 2025-11-08 17-48-58_783.png",   categories: ["portrait"]     },
  { filename: "Cyberpunk2077 2025-11-09 01-15-35_599.png",   categories: ["portrait"]     },
  { filename: "Cyberpunk2077 2025-11-15 20-47-02_854.png",   categories: ["portrait"]     },
  { filename: "Cyberpunk2077 2025-11-16 11-08-13_169.png",   categories: ["portrait"]     },
  { filename: "Cyberpunk2077 2025-11-16 11-37-34_532.png",   categories: ["portrait"]     },
  { filename: "Cyberpunk2077 2025-11-16 12-08-55_572.png",   categories: ["portrait"]     },
  { filename: "Cyberpunk2077 2025-11-18 03-38-24_194.png",   categories: ["portrait"]     },
  { filename: "Cyberpunk2077 2025-11-19 23-32-28_944.png",   categories: ["portrait", "artsy"] },
  { filename: "Cyberpunk2077 2025-11-22 15-34-15_923.png",   categories: ["artsy", "portrait"] },
  { filename: "Cyberpunk2077 2025-11-25 19-55-58_325.png",   categories: ["artsy"]        },
  { filename: "Cyberpunk2077 2025-12-05 15-44-44_163.png",   categories: ["portrait", "artsy"] },
  { filename: "Cyberpunk2077 2025-12-05 17-48-02_199.png",   categories: ["portrait", "artsy"] },
  { filename: "Cyberpunk2077 2025-12-08 02-11-32_395.png",   categories: ["portrait"]     },
  { filename: "Cyberpunk2077 2025-12-08 03-10-56_945.png",   categories: ["portrait"]     },
  { filename: "Cyberpunk2077 2025-12-08 03-30-07_352.png",   categories: ["portrait"]     },
  { filename: "Cyberpunk2077 2025-12-08 04-03-27_778.png",   categories: ["portrait"]     },
  { filename: "Cyberpunk2077 2025-12-20 18-50-12_882.png",   categories: ["portrait"]     },
  { filename: "Cyberpunk2077 2025-12-20 21-54-55_333.png",   categories: ["artsy"]        },
  { filename: "Cyberpunk2077 2025-12-20 22-35-37_540.png",   categories: ["portrait"]     },
  { filename: "Cyberpunk2077 2025-12-23 01-24-15_812.png",   categories: ["environment"]  },
  { filename: "Cyberpunk2077 2025-12-23 03-14-47_042.png",   categories: ["portrait", "artsy"] },
  { filename: "Cyberpunk2077 2025-12-25 04-25-42_706.png",   categories: ["portrait"]     },
  { filename: "Cyberpunk2077 2025-12-25 04-45-55_135.png",   categories: ["artsy", "portrait"] },
  { filename: "Cyberpunk2077 2025-12-28 03-06-35_727.png",   categories: ["portrait"]     },
  { filename: "Cyberpunk2077 2025-12-28 03-57-15_083.png",   categories: ["portrait"]     },
  { filename: "Cyberpunk2077 2025-12-28 04-14-03_369.png",   categories: ["portrait"]     },
  { filename: "Cyberpunk2077 2025-12-30 03-24-37_305.png",   categories: ["portrait"]     },
  { filename: "Cyberpunk2077 2026-01-02 14-28-50_210.png",   categories: ["portrait"]     },
  { filename: "Cyberpunk2077 2026-01-02 15-33-24_561.png",   categories: ["portrait", "artsy"] },
  { filename: "Cyberpunk2077 2026-01-02 16-10-59_038.png",   categories: ["portrait"]     },
  { filename: "Cyberpunk2077 2026-01-03 13-44-38_720.png",   categories: ["portrait"]     },
  { filename: "Cyberpunk2077 2026-01-03 14-47-11_236.png",   categories: ["portrait"]     },
  { filename: "Cyberpunk2077 2026-01-03 14-58-21_084.png",   categories: ["portrait", "artsy"] },
  { filename: "Cyberpunk2077 2026-01-08 03-44-23_168.png",   categories: ["portrait"]     },
  { filename: "Cyberpunk2077 2026-01-10 23-07-13_622.png",   categories: ["artsy", "portrait"] },
  { filename: "Cyberpunk2077 2026-01-13 02-00-29_236.png",   categories: ["portrait"]     },
  { filename: "Cyberpunk2077 2026-01-14 15-15-58_821.png",   categories: ["environment"]  },
  { filename: "Cyberpunk2077 2026-01-14 15-42-42_542.png",   categories: ["environment"]  },
  { filename: "Cyberpunk2077 2026-01-14 18-41-43_867.png",   categories: ["environment"]  },
  { filename: "Cyberpunk2077 2026-01-15 03-06-12_231.png",   categories: ["environment"]  },
  { filename: "Cyberpunk2077 2026-01-19 13-34-02_394.png",   categories: ["portrait"]     },
  { filename: "Cyberpunk2077 2026-01-19 15-38-15_424.png",   categories: ["portrait"]     },
  { filename: "Cyberpunk2077 2026-01-19 19-47-17_522.png",   categories: ["portrait"]     },
  { filename: "Cyberpunk2077 2026-01-22 03-47-30_605.png",   categories: ["environment"]  },
  { filename: "Cyberpunk2077 2026-01-22 21-02-42_231.png",   categories: ["environment"]  },
  { filename: "Cyberpunk2077 2026-01-25 00-45-48_904.png",   categories: ["environment"]  },
  { filename: "Cyberpunk2077 2026-01-27 00-34-03_199.png",   categories: ["environment"]  },
  { filename: "Cyberpunk2077 2026-01-30 02-02-13_209.png",   categories: ["environment"]  },
  { filename: "Cyberpunk2077 2026-01-31 04-42-08_127.png",   categories: ["portrait"]     },
  { filename: "Cyberpunk2077 2026-02-01 02-55-46_250.png",   categories: ["environment"]  },
  { filename: "Cyberpunk2077 2026-02-01 03-30-24_781.png",   categories: ["environment"]  },
  { filename: "Cyberpunk2077 2026-02-01 03-53-22_874.png",   categories: ["environment"]  },
  { filename: "Cyberpunk2077 2026-02-01 05-02-56_289.png",   categories: ["portrait"]     },
  { filename: "Cyberpunk2077 2026-02-02 01-54-16_695.png",   categories: ["portrait"]     },
  { filename: "Cyberpunk2077 2026-02-02 02-59-51_833.png",   categories: ["portrait"]     },
  { filename: "Cyberpunk2077 2026-02-03 02-14-47_391.png",   categories: ["portrait"]     },
  { filename: "Cyberpunk2077 2026-02-03 23-06-08_346.png",   categories: ["environment"]  },
  { filename: "Cyberpunk2077 2026-02-07 17-47-48_766.png",   categories: ["artsy", "portrait"] },
  { filename: "Cyberpunk2077 2026-02-07 17-48-12_594.png",   categories: ["bw"]           },
  { filename: "Cyberpunk2077 2026-02-09 23-16-53_658.png",   categories: ["environment"]  },
  { filename: "Cyberpunk2077 2026-02-10 00-51-24_929.png",   categories: ["environment", "artsy"] },
  { filename: "Cyberpunk2077 2026-02-11 00-52-44_447.png",   categories: ["environment"]  },
  { filename: "Cyberpunk2077 2026-02-14 02-37-29_924.png",   categories: ["artsy", "portrait"] },
  { filename: "Cyberpunk2077 2026-02-14 03-17-17_109.png",   categories: ["environment"]  },
  { filename: "Cyberpunk2077 2026-02-16 02-41-10_942.png",   categories: ["environment"]  },
  { filename: "Cyberpunk2077 2026-02-17 21-34-33_199.png",   categories: ["artsy"]        },
  { filename: "Cyberpunk2077 2026-03-08 19-45-16_952.png",   categories: ["portrait", "artsy"] },
  { filename: "Cyberpunk2077 2026-03-22 23-21-20_221.png",   categories: ["artsy"]        },
  { filename: "Cyberpunk2077 2026-03-23 15-35-01_572.png",   categories: ["portrait", "artsy"] },
  { filename: "Cyberpunk2077 2026-03-23 16-48-30_051.png",   categories: ["artsy"]        },
  { filename: "Cyberpunk2077 2026-03-23 18-18-01_194.png",   categories: ["artsy", "portrait"] },
  { filename: "Cyberpunk2077 2026-03-23 20-58-15_877.png",   categories: ["portrait"]     },
  { filename: "Cyberpunk2077 2026-04-03 03-22-53_957.png",   categories: ["artsy"]        },
  { filename: "Cyberpunk2077 2026-04-03 22-17-53_047.png",   categories: ["environment"]  },
  { filename: "Cyberpunk2077 2026-04-03 22-43-09_991.png",   categories: ["environment"]  },
  { filename: "Cyberpunk2077 2026-04-03 23-00-46_586.png",   categories: ["environment"]  },
  { filename: "Cyberpunk2077 2026-04-03 23-09-04_548.png",   categories: ["environment"]  },
  { filename: "Cyberpunk2077 2026-04-04 16-01-59_362.png",   categories: ["environment"]  },
  { filename: "Cyberpunk2077 2026-04-04 16-34-21_758.png",   categories: ["environment"]  },
  { filename: "Cyberpunk2077 2026-04-04 23-51-01_431.png",   categories: ["environment", "artsy"] },
  { filename: "Cyberpunk2077 2026-04-05 00-20-03_514.png",   categories: ["environment", "artsy"] },
  { filename: "Cyberpunk2077 2026-04-09 01-09-56_497.png",   categories: ["portrait"]     },
  { filename: "Cyberpunk2077 2026-04-09 02-14-01_747.png",   categories: ["portrait"]     },
  { filename: "Cyberpunk2077 2026-04-18 17-02-01_372.png",   categories: ["portrait", "artsy"] },
  { filename: "Cyberpunk2077 2026-04-19 01-15-09_820.png",   categories: ["portrait"]     },
  { filename: "Cyberpunk2077 2026-04-19 01-15-34_453.png",   categories: ["bw"]           },
  { filename: "Cyberpunk2077 2026-04-19 15-43-39_160.png",   categories: ["environment"]  },
  { filename: "Cyberpunk2077 2026-04-19 16-08-25_634.png",   categories: ["portrait", "artsy"] },
  { filename: "Cyberpunk2077 2026-04-22 01-06-14_597.png",   categories: ["portrait", "artsy"] },
  { filename: "Cyberpunk2077 2026-05-02 11-48-50_167.png",   categories: ["portrait"]     },
  { filename: "Cyberpunk2077 2026-05-02 12-54-11_915.png",   categories: ["environment"]  },
  { filename: "Cyberpunk2077 2026-05-16 13-52-11_907.png",   categories: ["artsy", "portrait"] },
  { filename: "Cyberpunk2077 2026-05-16 23-21-34_147.png",   categories: ["environment"]  },
  { filename: "Cyberpunk2077 2026-05-17 09-43-02_494.png",   categories: ["environment"]  },
  { filename: "Cyberpunk2077 2026-05-17 22-37-29_354.png",   categories: ["cars"]         },
  { filename: "Cyberpunk2077 2026-05-17 22-37-40_939.png",   categories: ["bw"]           },
  { filename: "Cyberpunk2077 2026-05-20 02-26-41_658.png",   categories: ["portrait"]     },
  { filename: "Cyberpunk2077 2026-05-20 02-26-50_085.png",   categories: ["bw"]           },
  { filename: "Cyberpunk2077 2026-05-20 03-07-49_173.png",   categories: ["portrait", "artsy"] },
  { filename: "Cyberpunk2077 2026-05-20 03-24-19_980.png",   categories: ["portrait", "artsy"] },
  { filename: "Cyberpunk2077 2026-05-22 10-51-39_260.png",   categories: ["portrait"]     },
  { filename: "Cyberpunk2077 2026-05-22 11-38-08_638.png",   categories: ["portrait"]     },
  { filename: "Cyberpunk2077 2026-05-23 10-39-59_382.png",   categories: ["portrait", "artsy"] },
  { filename: "Cyberpunk2077 2026-06-07 16-55-52_012-compressed.jpg", categories: ["portrait"] },
  { filename: "Cyberpunk2077 2026-06-10 11-55-05_035-compressed.jpg", categories: ["portrait"] },
  { filename: "Cyberpunk2077 2026-06-10 17-17-03_750-compressed.jpg", categories: ["portrait"] },
  { filename: "Cyberpunk2077 2026-06-10 17-59-02_242-compressed.jpg", categories: ["portrait"] },
  { filename: "Cyberpunk2077 2026-06-30 14-26-37_437-compressed.jpg", categories: ["environment"] },
  { filename: "Cyberpunk2077 2026-06-30 16-24-03_359-compressed.jpg", categories: ["environment"] },
  { filename: "Cyberpunk2077 2026-07-02 14-27-02_963-compressed.jpg", categories: ["artsy"] },
  { filename: "Cyberpunk2077 2026-07-02 14-38-08_602-compressed.jpg", categories: ["artsy"] },
  { filename: "Cyberpunk2077 2026-07-05 05-28-49_139-compressed.jpg", categories: ["environment"] },
  { filename: "Cyberpunk2077 2026-07-05 16-57-12_837-compressed.jpg", categories: ["environment"] },
  { filename: "Cyberpunk2077 2026-07-09 03-44-08_009-compressed.jpg", categories: ["artsy"] },
  { filename: "Cyberpunk2077 2026-07-09 14-26-03_225-compressed.jpg", categories: ["artsy"] },
];

export function parsePhotos(): Photo[] {
  return RAW.map((entry) => {
    const date = parseFilenameDate(entry.filename);
    return {
      filename: entry.filename,
      date,
      month: toMonthLabel(date),
      categories: entry.categories,
      url: entry.categories.includes("bw")
        ? `https://pub-e8e289d8d33e4c5ea574ea0ee67999a3.r2.dev/B%26W/${encodeURIComponent(entry.filename)}`
        : `https://pub-e8e289d8d33e4c5ea574ea0ee67999a3.r2.dev/${encodeURIComponent(entry.filename)}`,
    };
  }).sort((a, b) => b.date.getTime() - a.date.getTime()); // newest first
}

export function getMonths(photos: Photo[]): string[] {
  const seen = new Set<string>();
  const order: string[] = [];
  for (const p of photos) {
    if (!seen.has(p.month)) {
      seen.add(p.month);
      order.push(p.month);
    }
  }
  return order; // already newest-first from parsePhotos sort
}

export function getCategories(): { value: Category; label: string }[] {
  return [
    { value: "portrait",    label: "Portrait"    },
    { value: "artsy",       label: "Artsy"       },
    { value: "environment", label: "Environment" },
    { value: "cars",        label: "Cars"        },
    { value: "bw",          label: "B&W"         },
  ];
}
