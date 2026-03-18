# Agent Suite Shared Context Schema

This document defines the JSON schemas passed between agents in the development suite. Every agent produces one schema block at the end of its response. Downstream agents parse these blocks directly — no manual reformatting required.

---

## feature_brief.json
Produced by: **story-generator**
Consumed by: **dev-planner**, **ui-sketcher**, **test-writer**, **orchestrator**

```json
{
  "feature_brief": {
    "feature_name": "string",
    "generated_at": "2026-03-17T00:00:00Z",
    "stories": [
      {
        "id": "STORY-001",
        "title": "string",
        "persona": "string",
        "goal": "string",
        "benefit": "string",
        "acceptance_criteria": [
          {
            "id": "AC-001-01",
            "given": "string",
            "when": "string",
            "then": "string"
          }
        ],
        "priority": "high | medium | low",
        "estimated_complexity": "XS | S | M | L | XL"
      }
    ]
  }
}
```

---

## dev_plan_summary.json
Produced by: **dev-planner**
Consumed by: **code-reviewer**, **orchestrator**

```json
{
  "dev_plan_summary": {
    "feature_name": "string",
    "source_story_ids": ["STORY-001"],
    "total_tasks": 0,
    "estimated_hours_min": 0,
    "estimated_hours_max": 0,
    "phases": ["Phase 1 name", "Phase 2 name"],
    "top_risks": ["string"],
    "recommended_libraries": ["string"]
  }
}
```

---

## ui_spec.json
Produced by: **ui-sketcher**
Consumed by: **code-reviewer**, **orchestrator**

```json
{
  "ui_spec": {
    "feature_name": "string",
    "source_story_ids": ["STORY-001"],
    "screens": ["screen name 1", "screen name 2"],
    "components": ["component name 1", "component name 2"],
    "states": ["initial", "loading", "success", "error"],
    "key_interactions": ["string"]
  }
}
```

---

## test_report.json
Produced by: **test-writer**
Consumed by: **orchestrator**

```json
{
  "test_report": {
    "feature_name": "string",
    "source_story_ids": ["STORY-001"],
    "ac_coverage": {
      "total_criteria": 0,
      "criteria_covered": 0,
      "uncovered": ["AC-001-02"]
    },
    "test_counts": {
      "unit": 0,
      "integration": 0,
      "e2e": 0
    },
    "frameworks_used": ["jest"],
    "files_produced": ["string"]
  }
}
```

---

## review_report.json
Produced by: **code-reviewer**
Consumed by: **orchestrator**

```json
{
  "review_report": {
    "overall_verdict": "approve | approve_with_comments | request_changes",
    "critical_count": 0,
    "high_count": 0,
    "medium_count": 0,
    "low_count": 0,
    "files_reviewed": ["string"],
    "plan_deviation": false,
    "blocking_issues": ["string"]
  }
}
```

---

## bug_report.json
Produced by: **bug-analyzer**
Consumed by: **test-writer**, **code-reviewer**, **orchestrator**

```json
{
  "bug_report": {
    "error_location": "file:line",
    "root_cause_summary": "string",
    "severity": "critical | high | medium | low",
    "fix_complexity": "XS | S | M | L | XL",
    "affected_files": ["string"],
    "regression_tests_needed": ["string"]
  }
}
```

---

## workflow_state.json
Produced by: **orchestrator**
Consumed by: **orchestrator** (persisted across turns)

```json
{
  "workflow_state": {
    "workflow_type": "A | B | C | D",
    "feature_name": "string",
    "completed_agents": ["string"],
    "pending_agents": ["string"],
    "blocked": false,
    "blocking_reason": null,
    "stored_artifacts": ["feature_brief", "dev_plan_summary"]
  }
}
```

---

## Schema Versioning

All schemas are at version 1.0. If a field is optional (i.e. only present when upstream context is available), agents must handle its absence gracefully rather than failing. Required fields are those listed without a default value above.

When consuming a schema block, always parse the full block rather than relying on prose summaries. Prose summaries may abbreviate details; the JSON block is the authoritative source.
