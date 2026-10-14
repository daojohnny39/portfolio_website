// Side projects, written up as short posts. Facts come from the résumé second
// brain (Documents/Personal/Resume/SECOND_BRAIN/PROJECTS) and stay inside its
// limits: no unverified test results, no features from unmerged branches, and
// no links to private or held repositories. `Backticks` render as code.

export interface ProjectFigure {
  caption: string;
  items: string[];
  numbered?: boolean;
  columns?: 2 | 3 | 4;
}

export interface DiagramStep {
  title: string;
  detail?: string;
  /** Drawn dashed, for a step this path doesn't have. */
  absent?: boolean;
  /** Drawn solid, for the step the diagram centers on. */
  filled?: boolean;
}

/**
 * Two paths drawn side by side, top to bottom. They join at the shared steps,
 * then split into one last step each.
 */
export interface ProjectDiagram {
  /** Both paths need the same number of steps so each row lines up. */
  paths: [DiagramStep[], DiagramStep[]];
  shared: DiagramStep[];
  ends: [DiagramStep, DiagramStep];
  /** One sentence under the diagram saying what it shows. */
  caption: string;
}

/** A drawn diagram or a photo, linked to the full-size file so small labels stay readable. */
export interface ProjectImage {
  /** Path under public/, or a URL in the R2 bucket's projects/ folder. */
  src: string;
  width: number;
  height: number;
  alt: string;
  /** One sentence under the image saying what it shows. */
  caption?: string;
}

/** A recorded video. Nothing loads until the reader presses play. */
export interface ProjectVideo {
  src: string;
  poster?: string;
  /** Accessible name for the video. */
  label: string;
}

export interface ProjectSection {
  heading?: string;
  paragraphs?: string[];
  figure?: ProjectFigure;
  diagram?: ProjectDiagram;
  /** A drawn diagram. Sits above the section's paragraphs. */
  image?: ProjectImage;
  /** Sits below the section's paragraphs, in a thinner frame than a diagram. */
  photo?: ProjectImage;
  /** Sits below the section's paragraphs. */
  video?: ProjectVideo;
}

/** A recorded demo shown after the sections and before the note, with a short description above it. */
export interface ProjectDemo extends ProjectVideo {
  paragraphs: string[];
}

export interface Project {
  id: string;
  title: string;
  /** Shorter name for the projects list, when the title is long. */
  navTitle?: string;
  platform?: string;
  period: string;
  stack: string[];
  /** One line under the title. Optional; the header goes straight to the stack without it. */
  summary?: string;
  sections: ProjectSection[];
  note?: string;
  link?: { label: string; href: string };
  demo?: ProjectDemo;
}

// Videos and posters are served from the same R2 bucket as the photography.
const media = "https://pub-e8e289d8d33e4c5ea574ea0ee67999a3.r2.dev/projects";

export const projects: Project[] = [
  {
    id: "cyberpi",
    title: "CyberPI",
    platform: "Hack Midwest",
    period: "Oct. 2026",
    stack: ["Python", "AWS Strands Agents", "Amazon Rekognition", "SerpApi", "Claude", "TypeSafe Jev"],
    sections: [
      {
        paragraphs: [
          "CyberPI was my team's project at Hack Midwest 2026. A user can visit our web application, scan their face, and our system searches through images on the internet to find their profiles through their online presence. The user doesn't need to enter any extra information, other than their face. Our system handles finding their identity using real facial recognition across images of faces that we find on the internet.",
        ],
      },
      {
        heading: "The purpose",
        paragraphs: [
          "The purpose of the project was to identify the person, search through the internet to find their real identity, and warn the user about any potential fraudulent profiles that were set up using images of their own face. This is all done through a simple snapshot of their face with no additional information needed (could still be provided optionally)."
        ]
      },
      {
        heading: "Capturing",
        image: {
          src: "/projects/cyberpi-front-end.png",
          width: 5779,
          height: 1591,
          alt: "Hand-drawn diagram of the front end. A consenting individual faces the camera. MediaPipe Face Landmarker, running as a local model, determines the facial angle and decides whether it is worth capturing, and the camera saves a frame snapshot.",
        },
      },
      {
        heading: "Handling Input",
        paragraphs: [
          "The front-end pipeline asks the user for consent to enter their facial data for the purpose of our data search. After accepting, their camera is enabled and allows them to scan their face.", 
          "We then use Google's MediaPipe Face Landmarker, which uses the FaceMeshV2 model (ran locally) to assist the user in angling their face towards the camera for a snapshot. This allows us to get a clean shot for us to then send into our internet searching pipeline."
        ],
      },
      {
        heading: "Search and match",
        image: {
          src: "/projects/cyberpi-back-end.png",
          width: 7489,
          height: 4436,
          alt: "Hand-drawn diagram of the back end. A screenshot goes to an AWS Strands agent running Claude Opus 5.5. The agent sends it to AWS Rekognition for facial recognition and to a search step, which uses Trace and SerpApi (Yandex and Bing reverse image search) to find the person's internet presence, such as blog posts, Facebook posts and profiles, and Twitter/X posts. Each result goes to TypeSafe Jev, which parses names and bios from social media profiles and builds structured profiles. Each profile becomes a graph of connected accounts with a trust value for each, and a verification and synthesis pass returns the agent's candidates with confidence levels: John Doe at 94% is accepted, while Johnny Appleseed at 30% and Jane Doe at 2% are rejected.",
        },
      },
      {
        heading: "Finding the person through search results",
        paragraphs: [
          "The snapshot that was taken from the front-end pipeline is then fed into an AWS Strands agent, powered by Claude Opus 5.5. Through the Strands agent, we use Amazon Rekognition (facial recognition model) to get a clearer crop of the screenshot on the user's face. Alongside this, we do a search using Trace (facial image search) and SerpApi as our search API system (combining Yandex and Bing reverse image search). For each result, we then use Rekognition to match the user's face to the result that we found.",
          "We sift through the result that we found, parse through the result to find names, general bios, social media profiles, etc. We then build structured \"profiles\" based on the possible names for the user along with their connected accounts on a certain profile. We use TypeSafe's Jev model, which is a fast and efficient decision model, to decide whether two accounts belong to the same person.",
          "We then explore into each profile's connections and link them using a graph structure. Using this framework, we can then label each account with a trust value and build a table.",
          "This table is then fed into the Jev model, which can then build a confidence level for each candidate profile. Our code verifies the result, only accepting a strong match when confidence level is 0.80 or higher and it leads the next candidate by at least 0.20. The Strands agent then synthesizes a short bio for the accepted profile.",
        ],
      },
      {
        heading: "Output the user receives",
        paragraphs: [
          "Throughout the search and matching process, the user is informed of the progress of the search. Once the search finishes, the output they're given is any matching pages along with a confidence level from Rekognition's face match. The profile building and verification steps above ran in our command-line pipeline and weren't connected to the website yet.",
        ],
      },
      {
        heading: "A mock internet",
        paragraphs: [
          "Before doing live internet searches, which costs real money for every search, we built a mock internet server, which was hosted locally, containing a few fictional people and their pages. Once we proved that it could be done on a synthetically set up server, we then tested it on the live internet. We also built a fake image database, hosted on a teammate's machine, containing about 200,000 CelebA photos (real celebrity faces with made-up names and websites). We tested our framework by injecting our own profiles into it using our own images.",
        ],
      },
      {
        heading: "Live demo",
        video: {
          src: `${media}/cyberpi-live-demo.mp4`,
          poster: `${media}/cyberpi-live-demo-poster.jpg`,
          label: "CyberPI live demo",
        },
      },
      {
        heading: "Hackathon conclusion",
        paragraphs: [
          "Although we did not come out with a fully fleshed out product by the 24 hour mark, our project was more about creating a proof of concept that our framework can work. We planned to also implement VirusTotal scores along with the confidence level for each profile to assist users in finding fraudulent profiles using their images or face. We could not quite get this far (the only fraud check we had ran on the fake image database, where we marked one made-up fraud site as high risk), but the engineering behind our Strands framework was what we were aiming to prove could work."
        ],
        photo: {
          src: `${media}/cyberpi-hack-midwest-team.jpg`,
          width: 2400,
          height: 1800,
          alt: "The five members of the CyberPI team standing together on the Hack Midwest 2026 stage, wearing event lanyards, in front of a large sponsor screen.",
        },
      },
    ],
    link: { label: "View code", href: "https://github.com/daojohnny39/hackmidwest2026project" },
  },
  {
    id: "windows-autobot",
    title: "Windows Autobot",
    period: "May 2026",
    stack: ["Electron", "JavaScript", "PowerShell", "CDP", "Windows UI Automation"],
    summary: "A desktop assistant that lets a model read and operate other apps on a Windows PC.",
    sections: [
      {
        heading: "Why I built it",
        paragraphs: [
          "When I started this project, Codex computer use wasn't available on Windows yet. I'd seen how well it worked on macOS, so I tried to build something for Windows that worked in a similar way.",
        ],
      },
      {
        heading: "What it does",
        paragraphs: [
          "Windows Autobot finds the Electron and Win32 apps running on a PC and lets a model work inside one of them. I pick an app and a window, describe the task in a chat, and the model works through it one tool call at a time. It reads the app's interface as structured data rather than screenshots.",
        ],
        figure: {
          caption: "How a task runs",
          numbered: true,
          items: [
            "Find the running Electron and Win32 apps",
            "Read the chosen window's UI state",
            "The model picks an action from a fixed set of tools",
            "Run it and repeat, up to a round limit",
          ],
        },
      },
      {
        heading: "Two ways to read an app",
        diagram: {
          paths: [
            [
              { title: "Electron app", detail: "Chromium underneath" },
              { title: "Debugging port", detail: "Turned on by a PowerShell script, applied again at every logon" },
              { title: "Chrome DevTools Protocol", detail: "Reads the page directly" },
            ],
            [
              { title: "Win32 app" },
              { title: "No DevTools port", absent: true },
              { title: "Windows UI Automation", detail: "Reads the window's element tree" },
            ],
          ],
          shared: [
            { title: "Structured snapshot", detail: "Data, not screenshots" },
            { title: "Model", detail: "Picks the next action", filled: true },
          ],
          ends: [
            { title: "Electron actions", detail: "Fixed set for Electron apps" },
            { title: "Win32 actions", detail: "Fixed set for Win32 apps" },
          ],
          caption:
            "The assistant reads Electron apps over the Chrome DevTools Protocol and Win32 apps through Windows UI Automation, and either way the model gets a structured snapshot and only the actions defined for that kind of app.",
        },
      },
      {
        heading: "Agents and saved automations",
        paragraphs: [
          "Each app has its own agent settings. When an app has several windows or browser tabs, I choose which one the model works in. A task worth repeating can be saved as an automation, then edited or run again later.",
        ],
      },
    ],
    link: { label: "View code", href: "https://github.com/daojohnny39/WindowsAutoTask" },
    demo: {
      paragraphs: [
        "A light task across two apps. Notion is open on the left, and Chrome is on the right with this project's GitHub page. I asked the model to take the GitHub link from that Chrome tab and put it at the bottom of my Notion page. It read Chrome, selected the tab, switched to Notion and pasted the URL at the end of the page.",
      ],
      src: `${media}/windows-autobot-demo.mp4`,
      poster: `${media}/windows-autobot-demo-poster.jpg`,
      label: "Windows Autobot copying a GitHub link from Chrome into a Notion page",
    },
  },
  {
    id: "research-paper-audio-reader",
    title: "Research Paper Audio Reader",
    period: "Jul. 2026",
    stack: ["Tauri", "React", "TypeScript", "Rust", "Node.js"],
    summary: "A desktop app that reads research papers aloud with a local voice model.",
    sections: [
      {
        paragraphs: [
          "The app opens a research PDF and reads it aloud. It highlights each sentence as it's spoken and scrolls the page to keep up. Clicking any sentence starts reading from there.",
        ],
        figure: {
          caption: "From PDF to speech",
          numbered: true,
          items: [
            "Extract the text in column order",
            "Rejoin hyphenated words and split sentences",
            "Generate speech with Kokoro",
            "Highlight and scroll as each sentence plays",
          ],
        },
      },
      {
        heading: "Reading order",
        paragraphs: [
          "Many research papers are set in two columns. Pull the text off the page line by line and it jumps between the columns, and words hyphenated at line breaks come out in pieces. The extractor works out the column layout before reading, rejoins those words, and splits the text into sentences. Each sentence stays tied to its place on the page, which is what the highlighting and click-to-read depend on.",
        ],
      },
      {
        heading: "Local speech",
        paragraphs: [
          "The voice comes from Kokoro, an open-weight text-to-speech model, running in a local Node.js sidecar. The system voice is the fallback. Generated audio goes into a cache with a size limit, so replaying a sentence doesn't generate it again.",
          "The app hashes each document to identify it and saves reading progress, so reopening a paper picks up where I stopped.",
        ],
      },
    ],
    note: "Standalone validation scripts check extraction, small caps, tables, parentheses, pronunciation and speech. They aren't a full test suite yet.",
    link: { label: "View code", href: "https://github.com/daojohnny39/ResearchPaperAudioReader" },
  },
  {
    id: "remote-codex",
    title: "RemoteCodex",
    platform: "macOS/iOS",
    period: "Jul. 2026 – Present",
    stack: ["Swift 6", "SwiftUI", "WebSockets", "JSON-RPC", "Tailscale"],
    summary: "An iPhone app for running Codex sessions on my Mac while I'm away from it.",
    sections: [
      {
        paragraphs: [
          "RemoteCodex has two parts, a SwiftUI iPhone app and a macOS menu-bar host. The host runs Codex and connects it to the phone over Tailscale. From the phone I can run up to four sessions, send text and images, choose a model and reasoning effort for each session, and answer approval requests and questions.",
          "When I'm back at the Mac, I can continue the same thread in Terminal and later pick it up again on the phone.",
        ],
        figure: {
          caption: "The connection",
          numbered: true,
          items: [
            "iPhone app",
            "Authenticated WebSocket over Tailscale",
            "macOS host",
            "Codex app-server over JSON-RPC",
          ],
        },
      },
      {
        heading: "Translating the protocol",
        paragraphs: [
          "Codex's app-server sends JSON-RPC messages as a stream of JSON lines. That works for a client on the same machine, but the phone sleeps and switches networks, so the host converts the stream into a versioned WebSocket API. When the phone reconnects, the host replays the events it missed in order, or sends a snapshot of the session that the phone rebuilds its state from.",
        ],
      },
      {
        heading: "Access",
        paragraphs: [
          "To pair the phone, I scan a QR code on the Mac. The phone stores its credentials in the Keychain. Every request needs a valid Tailscale identity and a bearer token. The host rejects requests from browser origins and rate-limits clients.",
          "The phone can open only folders I've approved, and it refers to them by opaque IDs instead of paths. Each session runs in its own process group.",
        ],
      },
    ],
    note: "I haven't verified cellular connections or several permission flows on a physical device yet. I haven't distributed it beyond my own devices.",
  },
  {
    id: "custom-codex",
    title: "CustomCodex",
    period: "Sep. 2026 – Present",
    stack: ["JavaScript", "Node.js", "Electron", "JSON-RPC/JSONL"],
    summary: "A modified Codex desktop app that runs Claude Code sessions.",
    sections: [
      {
        paragraphs: [
          "CustomCodex is a modified local copy of OpenAI's Codex desktop app. OpenAI built the app and its interface. I built an adapter that lets the interface run Claude Code sessions, and I changed how the app keeps panels and terminals across tasks.",
        ],
        figure: {
          caption: "One turn through the adapter",
          numbered: true,
          items: [
            "The Codex app sends a thread or turn request",
            "The Node.js adapter maps it to Claude Code",
            "Claude Code runs the turn",
            "The adapter converts the streamed events into the app's format",
          ],
        },
      },
      {
        heading: "The adapter",
        paragraphs: [
          "The Codex app organizes work into threads and turns, and the adapter maps those operations onto Claude Code's runtime. It starts and resumes Claude Code sessions and converts streamed responses and tool events into the events the app expects. It also forwards permission requests to the app's approval prompts and passes cancellation through.",
          "The app's three permission settings map to Claude Code's native modes. \"Ask for approval\" becomes manual approval, \"Approve for me\" becomes auto mode, and \"Full access\" bypasses the prompts. Before each prompt, the adapter checks that the selected model, session and permission mode match what Claude Code will run. If they don't match, it refuses the request instead of running with different settings.",
        ],
      },
      {
        heading: "Panels shared across a project",
        paragraphs: [
          "In the stock app, the side panels and the terminal belong to a single task. I changed them to belong to the project and its checkout. When I switch between tasks in the same project, the same panels stay open and the same terminal sessions keep running. Each project has its own panels and terminals, and a plan stays attached to the task that created it. Quitting the app still closes the panels and terminals.",
        ],
      },
    ],
    note: "I built this for my own use. OpenAI's app can't be redistributed, so there's no public repository.",
  },
  {
    id: "fan-control",
    title: "Fan Control",
    platform: "macOS",
    period: "Jul. 2026 – Sep. 2026",
    stack: ["Swift", "SwiftUI/AppKit", "IOKit/AppleSMC", "XPC", "LaunchDaemon"],
    summary:
      "A menu-bar fan controller for my M1 Pro MacBook Pro that returns the fans to macOS control whenever it can't verify their state.",
    sections: [
      {
        paragraphs: [
          "Fan Control can run the fans at a fixed speed in 10% steps or follow a temperature curve I can edit. A curve can also return the fans to macOS control below a set temperature. The menu bar shows the temperature, and the menu shows live fan speeds.",
          "It supports only the `MacBookPro18,3`, the model I verified its SMC keys on.",
        ],
      },
      {
        heading: "The privileged helper",
        paragraphs: [
          "Writing to the System Management Controller requires root. The app installs a helper that runs as a LaunchDaemon and communicates with it over XPC. The helper accepts connections only from the signed Fan Control app. It writes only keys on a fixed allowlist and has no general-purpose SMC write command.",
        ],
      },
      {
        heading: "Falling back to Automatic",
        paragraphs: [
          "Before taking manual control, the helper writes a journal entry. The app sends a heartbeat to renew its lease on the fans. After each manual change, the helper reads back every fan's mode and target, and if any value doesn't match, it returns all fans to Automatic. The app refuses manual control if it finds a fan layout it doesn't recognize or a vetted temperature sensor is missing.",
        ],
        figure: {
          caption: "Fans return to Automatic on",
          columns: 4,
          items: [
            "Quit",
            "Sleep",
            "Lost XPC connection",
            "Stale telemetry",
            "Expired heartbeat",
            "Failed write",
            "Read-back mismatch",
            "Helper restart",
          ],
        },
      },
      {
        heading: "Sleep and wake",
        paragraphs: [
          "After the Mac woke from sleep, a race condition made SMC read-backs fail. The fix reopens the AppleSMC connection after wake and retries the read-back in a fresh session that starts in Automatic. The app resumes the previous speed or curve only after new readings pass the safety checks.",
          "A brief telemetry error no longer ends manual control immediately. The app keeps control for up to two seconds while the last verified reading is still fresh, then returns the fans to Automatic.",
        ],
      },
    ],
    note: "It's signed only for my own machine. Distributing it would require Developer ID signing and notarization, and it would still support only this one model.",
  },
  {
    id: "ai-usage-viewer",
    title: "AI Usage Viewer",
    platform: "macOS",
    period: "Jun. 2026 – Aug. 2026",
    stack: ["Electron", "Node.js", "SwiftUI", "WidgetKit"],
    summary: "An overlay and a desktop widget that show Claude and Codex usage limits.",
    sections: [
      {
        paragraphs: [
          "Claude and Codex both limit usage over a short session window and a weekly window, and each reports those limits in its own format. I built a viewer for Windows first, then ported it to macOS. The Mac version has an Electron overlay and a native WidgetKit widget. Both show the session and weekly limits for the two providers in the same layout.",
        ],
      },
      {
        heading: "Parsing by duration",
        paragraphs: [
          "Codex can report a seven-day limit as its primary window and leave the secondary window empty. A parser that mapped windows by position would show that weekly limit as the session limit. The JavaScript and Swift parsers now classify each window by its declared duration, and a test fixture covers this case.",
        ],
      },
      {
        heading: "Handling failures",
        paragraphs: [
          "If one provider stops responding, the other keeps updating. Failed requests retry with exponential backoff. The viewer manages Claude accounts in isolated profiles and refreshes their sign-in tokens. The app stores credentials in the Keychain.",
          "The overlay's processes exchange data over sanitized IPC. Clicks go through the overlay to the window underneath, so it can stay on top of other windows. It also has hotkeys and can launch at login.",
        ],
      },
    ],
    note: "The widget refreshes only while the host app is running. The public repository is the earlier Windows version and doesn't include the macOS overlay or widget.",
    link: { label: "View Windows version", href: "https://github.com/daojohnny39/AI_Usage_Viewer" },
  },
  {
    id: "cyberpunk-mod",
    title: "Cyberpunk 2077 Skeletal Reshaping Mod",
    navTitle: "Cyberpunk 2077 Mod",
    period: "Jul. 2026",
    stack: ["C#/.NET 8", "C++20", "Lua", "PowerShell", "WolvenKit", "RED4ext"],
    summary: "A Cyberpunk 2077 mod that changes body proportions by rescaling bones in the character rigs.",
    sections: [
      {
        paragraphs: [
          "The mod adds an in-game panel, written in Lua on Cyber Engine Tweaks, with eight controls across four regions: hips, chest, legs, and arms and shoulders. I can save settings as named presets. A .NET tool outside the game applies the changes by editing the character rigs.",
        ],
        figure: {
          caption: "Applying a change",
          numbered: true,
          items: [
            "Adjust the controls in game",
            "A PowerShell watcher waits for the game to close",
            "The .NET tool rescales bones and packs the rigs",
            "The tool reads the archive back to verify it",
          ],
        },
      },
      {
        heading: "Baking on restart",
        paragraphs: [
          "The watcher hashes the staged settings, queues the work while the game is running, and starts the build after the game exits. The .NET 8 tool, built on WolvenKit, searches the installed archives for the rig files the game will load, including overrides from other mods. It scales bones without changing the skeleton's hierarchy and packs the result into a mod archive. Then it opens that archive again to check that the new values were written. The in-game panel shows the bake status.",
        ],
      },
      {
        heading: "Debugging in game",
        paragraphs: [
          "The first problem was load order. REDengine uses the first copy of a resource it loads, and another archive was loading first. After I renamed my archive so it loaded first, the body reshaped in game. That configuration also distorted the legs, which led to later changes to the bone map.",
          "The second problem was clothing. The body was scaled through two deformation components, but one garment followed the deformation rig only once. The garment and the body moved out of alignment and clipped.",
        ],
      },
      {
        heading: "Live scaling",
        paragraphs: [
          "I also started a C++20 plugin on RED4ext to apply bone scales while the game runs. It registers native functions and keeps the target scales in shared state guarded by mutexes and atomics. I haven't written the per-frame pose hook yet, so the plugin reports that it isn't ready and the Lua panel falls back to baking.",
        ],
      },
    ],
    note: "I've tested it on one rig. By default it edits shared rigs, so NPCs that use the same rig change too. There's an experimental player-only mode. The repository is private.",
  },
];
