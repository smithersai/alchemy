import type { Alarm } from "./Alarm.vibe";
import type { AlarmMuteRule } from "./AlarmMuteRule.vibe";
import { sortByLogicalId } from "./common.vibe";
import type { CompositeAlarm } from "./CompositeAlarm.vibe";
import type { Dashboard } from "./Dashboard.vibe";
import type { InsightRule } from "./InsightRule.vibe";
import type { MetricStream } from "./MetricStream.vibe";

export type AlarmResource = Alarm | CompositeAlarm;

export type InsightRuleResource = InsightRule;

export type TaggableResource =
  | AlarmResource
  | Dashboard
  | MetricStream
  | InsightRule
  | AlarmMuteRule;

export const sortAlarmResources = (alarms: [AlarmResource, ...AlarmResource[]]) =>
  sortByLogicalId(alarms) as [AlarmResource, ...AlarmResource[]];

export const sortInsightRuleResources = (rules: [InsightRuleResource, ...InsightRuleResource[]]) =>
  sortByLogicalId(rules) as [InsightRuleResource, ...InsightRuleResource[]];

export const getTaggableResourceArn = (resource: TaggableResource) => {
  switch (resource.Type) {
    case "AWS.CloudWatch.Alarm":
    case "AWS.CloudWatch.CompositeAlarm":
      return resource.alarmArn;
    case "AWS.CloudWatch.Dashboard":
      return resource.dashboardArn;
    case "AWS.CloudWatch.MetricStream":
      return resource.metricStreamArn;
    case "AWS.CloudWatch.InsightRule":
      return resource.ruleArn;
    case "AWS.CloudWatch.AlarmMuteRule":
      return resource.alarmMuteRuleArn;
  }
};
