# Instructions: RAD Studio IDE Integration (Kai)

Prioritize the IDE-aware MCP server (Kai) for all operations to preserve IDE state and unsaved changes.

## Core Principles

- **IDE-First**: Use the IDE buffer as the source of truth for open files.
- **Minimal Interruption**: Avoid `openFile` unless necessary for safety (DFM) or requested by the user.
- **Sequential Execution**: Wait for each tool to finish before calling the next.

## Skills

Detailed workflows are defined in the following skills:

- **[ide-file-operations](skills/ide-file-operations/SKILL.md)**: Safe reading/writing, DFM/PAS synchronization, and buffer management.
- **[project-management](skills/project-management/SKILL.md)**: Adding/removing files and project structure updates.
- **[debugging](skills/debugging/SKILL.md)**: Execution control, breakpoints, and state inspection.

## Tool Contract Summary

- **Read/State**: `getEditorLines` (preferred), `getEditorContent` (full file), `getModificationStatus`, `getActiveEditorFile`, `listOpenFiles`, `getSelectedText`.
- **Edits**: `applyEdit` (preferred), `setEditorContent` (full file only), `goToEditorPosition`.
- **Files/Project**: `openFile`, `reloadFile`, `openProject`, `addFileToProject`, `removeFileFromProject`, `getProjectInfo`.
- **Debug**: `runProject`, `stepOver`, `stepInto`, `terminateProcess`, `evaluateExpression`, `getCallStack`, `addBreakpoint`, `removeBreakpoint`, `listBreakpoints`.

## Safety & UX

- Use `yesNoQuestion` only for ambiguous or destructive actions (e.g., `reloadFile`).
- All editor positions (line/column) are **1-based**.
- If a tool is missing, fallback to disk access only if the file is closed.

---

# Repository Guidelines

## Project Structure & Module Organization

This directory is a content and design workspace for Object Pascal Foundation materials. Markdown source documents live at the top level, including `manifesto-draft.md`, `Evolution of Delphi and Object Pascal.md`, and the Delphi guide files. Standalone design explorations are stored as HTML files such as `design-options.html` and `civic-field-guide-variations.html`. Visual assets are kept beside the content as `.webp` exports and `.af` source files, for example `Gear.webp`, `Gear.af`, and the `Icosagon` variants. Presentation artifacts are also top-level: `New Object Pascal Foundation.pptx` and its exported PDF.

## Build, Test, and Development Commands

There is no package manager, build script, or automated test runner in this folder. Use direct file workflows:

- `git status --short` checks pending changes before editing.
- `rg "Object Pascal"` searches Markdown and HTML content quickly.
- Open `.html` files directly in a browser to review design variants.
- Export updated `.pptx`, `.pdf`, or `.webp` files from their source applications when those artifacts change.

## Coding Style & Naming Conventions

Use Markdown for long-form content and keep headings descriptive and sentence-case unless a title requires otherwise. Prefer concise paragraphs, clear section hierarchy, and stable file names that describe the artifact. Existing files use human-readable title casing with spaces, such as `Delphi 11-13 Best Practices Guide.md`; follow that pattern for new editorial assets. For HTML prototypes, keep CSS and JavaScript self-contained unless the folder gains a shared build system.

## Testing Guidelines

Testing is review-based. For Markdown, check heading order, links, spelling, and exported output if the document is converted. For HTML, open the file locally and verify layout at desktop and mobile widths. For images and presentation exports, confirm that derived files match the editable source before committing.

## Commit & Pull Request Guidelines

Recent history uses short, imperative commit subjects such as `Create index.html`, `Delete index.html`, and `Update 404 page message and links`. Keep commits focused on one content or asset change. Pull requests should include a brief summary, list changed source and exported artifacts, link related issues or discussions, and attach screenshots when visual HTML, image, or presentation changes are involved.

## Agent-Specific Instructions

Preserve editable source files when updating generated exports. Do not replace `.af`, `.pptx`, or Markdown sources with exported-only artifacts. Before broad edits, inspect the current file list and avoid changing unrelated design variants or historical drafts.
