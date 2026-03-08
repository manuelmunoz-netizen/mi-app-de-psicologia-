import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { SymbolWeight, SymbolViewProps } from "expo-symbols";
import { ComponentProps } from "react";
import { OpaqueColorValue, type StyleProp, type TextStyle } from "react-native";

type IconMapping = Record<string, ComponentProps<typeof MaterialIcons>["name"]>;
type IconSymbolName = keyof typeof MAPPING;

const MAPPING = {
  // Navigation
  "house.fill": "home",
  "person.2.fill": "people",
  "brain.head.profile": "psychology",
  "chart.line.uptrend.xyaxis": "trending-up",
  "gearshape.fill": "settings",
  // Patients
  "person.fill": "person",
  "person.badge.plus": "person-add",
  "person.crop.circle": "account-circle",
  "calendar": "calendar-today",
  "clock.fill": "schedule",
  // Clinical
  "stethoscope": "medical-services",
  "heart.text.square.fill": "favorite",
  "cross.case.fill": "local-hospital",
  "waveform.path.ecg": "monitor-heart",
  // TCC Tools
  "brain": "psychology",
  "thought.bubble.fill": "chat-bubble",
  "pencil.and.list.clipboard": "assignment",
  "list.bullet.clipboard": "checklist",
  "chart.bar.fill": "bar-chart",
  "checkmark.circle.fill": "check-circle",
  "xmark.circle.fill": "cancel",
  // Scales
  "doc.text.fill": "description",
  "clipboard.fill": "content-paste",
  "number.square.fill": "tag",
  // Emotions
  "face.smiling": "sentiment-satisfied",
  "face.dashed": "sentiment-dissatisfied",
  "bolt.fill": "bolt",
  // Actions
  "plus.circle.fill": "add-circle",
  "plus": "add",
  "chevron.right": "chevron-right",
  "chevron.left": "chevron-left",
  "chevron.down": "expand-more",
  "chevron.up": "expand-less",
  "arrow.left": "arrow-back",
  "arrow.right": "arrow-forward",
  "trash.fill": "delete",
  "square.and.pencil": "edit",
  "paperplane.fill": "send",
  "magnifyingglass": "search",
  "ellipsis": "more-horiz",
  "ellipsis.circle": "more-vert",
  // Info
  "info.circle.fill": "info",
  "exclamationmark.triangle.fill": "warning",
  "checkmark": "check",
  "xmark": "close",
  // Progress
  "chart.xyaxis.line": "show-chart",
  "chart.pie.fill": "pie-chart",
  "arrow.up.right": "north-east",
  "arrow.down.right": "south-east",
  // Relaxation
  "wind": "air",
  "lungs.fill": "self-improvement",
  "moon.fill": "bedtime",
  "sun.max.fill": "wb-sunny",
  // Misc
  "star.fill": "star",
  "bookmark.fill": "bookmark",
  "bell.fill": "notifications",
  "lock.fill": "lock",
  "shield.fill": "security",
  "eye.fill": "visibility",
  "eye.slash.fill": "visibility-off",
  "chevron.left.forwardslash.chevron.right": "code",
} as IconMapping;

export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  const iconName = MAPPING[name] ?? "help-outline";
  return <MaterialIcons color={color} size={size} name={iconName} style={style} />;
}
