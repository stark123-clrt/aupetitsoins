/* @ds-bundle: {"format":3,"namespace":"EmberStudioDesignSystem_c8a645","components":[{"name":"Avatar","sourcePath":"components/display/Avatar.jsx"},{"name":"Badge","sourcePath":"components/display/Badge.jsx"},{"name":"Card","sourcePath":"components/display/Card.jsx"},{"name":"Chip","sourcePath":"components/display/Chip.jsx"},{"name":"ProgressBar","sourcePath":"components/display/ProgressBar.jsx"},{"name":"Dialog","sourcePath":"components/feedback/Dialog.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"Button","sourcePath":"components/forms/Button.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"IconButton","sourcePath":"components/forms/IconButton.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"}],"sourceHashes":{"components/display/Avatar.jsx":"ee04504b57f1","components/display/Badge.jsx":"9681aeebfa0b","components/display/Card.jsx":"c571760b9896","components/display/Chip.jsx":"2ae3018725a2","components/display/ProgressBar.jsx":"f8ed9739446c","components/feedback/Dialog.jsx":"93d28cd036df","components/feedback/Toast.jsx":"12f7bf0c7d47","components/forms/Button.jsx":"45746861aa49","components/forms/Checkbox.jsx":"7bd911579e2a","components/forms/IconButton.jsx":"8cf426a54ccd","components/forms/Input.jsx":"d31b8feb0808","components/forms/Select.jsx":"87916ebc0fee","components/forms/Switch.jsx":"78854ae12a42","components/navigation/Tabs.jsx":"1cc5be2d703c","ui_kits/app/App.jsx":"426d505470e6","ui_kits/app/Dashboard.jsx":"3b2f207ca15b","ui_kits/app/Icon.jsx":"d70e8d4f2c0f","ui_kits/app/ProjectDetail.jsx":"3b2551cdec7f","ui_kits/app/Sidebar.jsx":"252def3d3b34","ui_kits/app/Topbar.jsx":"0d12e41e8cfe","ui_kits/app/data.js":"8034a754b664"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.EmberStudioDesignSystem_c8a645 = window.EmberStudioDesignSystem_c8a645 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/display/Avatar.jsx
try { (() => {
/**
 * Ember Studio — Avatar
 * Circular avatar with image or initials fallback. Stack with overlap via `stacked`.
 */
const PALETTE = ["#C2410C", "#F59E0B", "#16A34A", "#2563EB", "#7C3AED", "#E11D48"];
function Avatar({
  src,
  name = "",
  size = 32,
  stacked = false,
  style = {}
}) {
  const initials = name.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase();
  const colorIdx = name ? name.charCodeAt(0) % PALETTE.length : 0;
  return /*#__PURE__*/React.createElement("span", {
    title: name || undefined,
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: size + "px",
      height: size + "px",
      flex: "none",
      borderRadius: "var(--radius-full)",
      overflow: "hidden",
      background: src ? "var(--surface-raised)" : PALETTE[colorIdx],
      color: "#fff",
      fontSize: Math.round(size * 0.4) + "px",
      fontWeight: "var(--fw-semibold)",
      border: "2px solid var(--surface-card)",
      marginLeft: stacked ? "-8px" : "0",
      ...style
    }
  }, src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name,
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  }) : initials);
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/display/Badge.jsx
try { (() => {
/**
 * Ember Studio — Badge
 * Small status pill. Tinted background + semantic text color. Optional leading dot.
 */
function Badge({
  tone = "neutral",
  dot = false,
  children,
  style = {}
}) {
  const tones = {
    neutral: {
      bg: "var(--surface-raised)",
      fg: "var(--text-secondary)"
    },
    primary: {
      bg: "var(--primary-tint)",
      fg: "var(--primary)"
    },
    success: {
      bg: "var(--success-tint)",
      fg: "var(--success)"
    },
    warning: {
      bg: "var(--warning-tint)",
      fg: "var(--warning)"
    },
    error: {
      bg: "var(--error-tint)",
      fg: "var(--error)"
    },
    accent: {
      bg: "var(--accent-tint)",
      fg: "#92400E"
    }
  };
  const t = tones[tone] || tones.neutral;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
      background: t.bg,
      color: t.fg,
      fontSize: "var(--fs-caption)",
      fontWeight: "var(--fw-semibold)",
      padding: "3px 10px",
      borderRadius: "var(--radius-full)",
      lineHeight: 1.4,
      whiteSpace: "nowrap",
      ...style
    }
  }, dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: "6px",
      height: "6px",
      borderRadius: "var(--radius-full)",
      background: t.fg
    }
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Badge.jsx", error: String((e && e.message) || e) }); }

// components/display/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Ember Studio — Card
 * Warm surface, 1px border, 12px radius, flat at rest. Lifts on hover.
 * `stripe` adds a 4px colored left edge (project color). `selected` shows a terracotta left border.
 */
function Card({
  stripe,
  selected = false,
  interactive = false,
  onClick,
  children,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const lift = interactive && hover;
  return /*#__PURE__*/React.createElement("div", _extends({
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      position: "relative",
      background: "var(--surface-card)",
      border: "1px solid " + (selected ? "var(--primary)" : "var(--border-default)"),
      borderLeft: selected ? "3px solid var(--primary)" : stripe ? "4px solid " + stripe : "1px solid " + "var(--border-default)",
      borderRadius: "var(--radius-lg)",
      padding: "16px",
      boxShadow: lift ? "var(--shadow-card-hover)" : "none",
      transform: lift ? "translateY(-2px)" : "translateY(0)",
      transition: "transform var(--dur-fast) var(--ease-standard), box-shadow var(--dur-fast) var(--ease-standard), border-color var(--dur-fast) var(--ease-standard)",
      cursor: interactive ? "pointer" : "default",
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Card.jsx", error: String((e && e.message) || e) }); }

// components/display/Chip.jsx
try { (() => {
/**
 * Ember Studio — Chip
 * Pill for categories/filters. Inactive: stone tint. Active: terracotta fill.
 * Optional onRemove renders a trailing ✕.
 */
function Chip({
  active = false,
  onClick,
  onRemove,
  children,
  style = {}
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("span", {
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
      background: active ? "var(--primary)" : hover && onClick ? "var(--surface-raised)" : "var(--surface-card)",
      color: active ? "var(--text-on-primary)" : "var(--text-secondary)",
      border: "1px solid " + (active ? "var(--primary)" : "var(--border-default)"),
      fontSize: "var(--fs-small)",
      fontWeight: "var(--fw-semibold)",
      padding: "6px 14px",
      borderRadius: "var(--radius-full)",
      lineHeight: 1,
      cursor: onClick ? "pointer" : "default",
      transition: "background var(--dur-fast) var(--ease-standard), color var(--dur-fast) var(--ease-standard)",
      ...style
    }
  }, children, onRemove && /*#__PURE__*/React.createElement("span", {
    role: "button",
    "aria-label": "Remove",
    onClick: e => {
      e.stopPropagation();
      onRemove(e);
    },
    style: {
      display: "inline-flex",
      opacity: 0.7,
      marginRight: "-4px"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 12 12",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3 3l6 6M9 3l-6 6",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round"
  }))));
}
Object.assign(__ds_scope, { Chip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Chip.jsx", error: String((e && e.message) || e) }); }

// components/display/ProgressBar.jsx
try { (() => {
/**
 * Ember Studio — ProgressBar
 * 4px rounded track, terracotta fill, 300ms ease. Optional label + percentage above.
 */
function ProgressBar({
  value = 0,
  max = 100,
  label,
  showPercent = false,
  tone = "primary",
  style = {}
}) {
  const pct = Math.max(0, Math.min(100, value / max * 100));
  const fills = {
    primary: "var(--primary)",
    success: "var(--success)",
    warning: "var(--warning)",
    accent: "var(--accent)"
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      ...style
    }
  }, (label || showPercent) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "6px"
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--fs-small)",
      color: "var(--text-secondary)"
    }
  }, label), showPercent && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--fs-small)",
      color: "var(--text-muted)",
      fontVariantNumeric: "tabular-nums"
    }
  }, Math.round(pct), "%")), /*#__PURE__*/React.createElement("div", {
    style: {
      height: "4px",
      borderRadius: "var(--radius-full)",
      background: "var(--surface-raised)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: pct + "%",
      height: "100%",
      borderRadius: "var(--radius-full)",
      background: fills[tone] || fills.primary,
      transition: "width var(--dur-medium) var(--ease-standard)"
    }
  })));
}
Object.assign(__ds_scope, { ProgressBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/ProgressBar.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Dialog.jsx
try { (() => {
/**
 * Ember Studio — Dialog
 * Centered modal over a warm dimmed + blurred backdrop. 12px radius, large soft shadow.
 * Controlled via `open` + `onClose`.
 */
function Dialog({
  open,
  onClose,
  title,
  description,
  footer,
  children,
  width = 440,
  style = {}
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 1000,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px",
      background: "var(--backdrop)",
      backdropFilter: "blur(var(--backdrop-blur))",
      WebkitBackdropFilter: "blur(var(--backdrop-blur))"
    }
  }, /*#__PURE__*/React.createElement("div", {
    role: "dialog",
    "aria-modal": "true",
    onClick: e => e.stopPropagation(),
    style: {
      width: width + "px",
      maxWidth: "100%",
      background: "var(--surface-overlay)",
      borderRadius: "var(--radius-lg)",
      boxShadow: "var(--shadow-modal)",
      padding: "24px",
      ...style
    }
  }, title && /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 700,
      letterSpacing: "-0.02em",
      fontSize: "var(--fs-subhead)",
      margin: 0
    }
  }, title), description && /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--text-secondary)",
      fontSize: "var(--fs-small)",
      margin: "8px 0 0"
    }
  }, description), children && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "16px"
    }
  }, children), footer && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "flex-end",
      gap: "12px",
      marginTop: "24px"
    }
  }, footer)));
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
/**
 * Ember Studio — Toast
 * Compact notification surface with a status accent stripe and icon dot.
 * Presentational — manage visibility/stacking in your app.
 */
function Toast({
  tone = "neutral",
  title,
  message,
  onDismiss,
  style = {}
}) {
  const tones = {
    neutral: "var(--text-secondary)",
    success: "var(--success)",
    warning: "var(--warning)",
    error: "var(--error)",
    primary: "var(--primary)"
  };
  const accent = tones[tone] || tones.neutral;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      gap: "12px",
      minWidth: "280px",
      maxWidth: "380px",
      background: "var(--surface-overlay)",
      border: "1px solid var(--border-default)",
      borderLeft: "3px solid " + accent,
      borderRadius: "var(--radius-lg)",
      boxShadow: "var(--shadow-popover)",
      padding: "12px 14px",
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: "8px",
      height: "8px",
      borderRadius: "var(--radius-full)",
      background: accent,
      marginTop: "6px",
      flex: "none"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, title && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--fs-small)",
      fontWeight: "var(--fw-semibold)",
      color: "var(--text-primary)"
    }
  }, title), message && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--fs-small)",
      color: "var(--text-secondary)",
      marginTop: title ? "2px" : 0
    }
  }, message)), onDismiss && /*#__PURE__*/React.createElement("button", {
    onClick: onDismiss,
    "aria-label": "Dismiss",
    style: {
      appearance: "none",
      border: "none",
      background: "transparent",
      cursor: "pointer",
      color: "var(--text-muted)",
      padding: 0,
      display: "flex"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3.5 3.5l7 7M10.5 3.5l-7 7",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round"
  }))));
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/forms/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Ember Studio — Button
 * Primary terracotta CTA, secondary outline, ghost, and destructive.
 * One primary CTA per view. Sentence-case labels, no trailing period.
 */
function Button({
  variant = "primary",
  size = "md",
  disabled = false,
  type = "button",
  iconLeft = null,
  iconRight = null,
  fullWidth = false,
  onClick,
  children,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const sizes = {
    sm: {
      height: 32,
      padding: "0 12px",
      font: "var(--fs-small)"
    },
    md: {
      height: 40,
      padding: "0 16px",
      font: "var(--fs-body)"
    },
    lg: {
      height: 48,
      padding: "0 24px",
      font: "var(--fs-body)"
    }
  };
  const s = sizes[size] || sizes.md;
  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    height: s.height + "px",
    padding: s.padding,
    width: fullWidth ? "100%" : "auto",
    fontFamily: "var(--font-body)",
    fontSize: s.font,
    fontWeight: "var(--fw-semibold)",
    lineHeight: 1,
    borderRadius: "var(--radius-md)",
    border: "1px solid transparent",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    transition: "background var(--dur-fast) var(--ease-standard), box-shadow var(--dur-fast) var(--ease-standard), border-color var(--dur-fast) var(--ease-standard), color var(--dur-fast) var(--ease-standard)",
    boxShadow: "none",
    whiteSpace: "nowrap"
  };
  const variants = {
    primary: {
      background: active ? "var(--primary-hover)" : hover ? "var(--primary-hover)" : "var(--primary)",
      color: "var(--text-on-primary)",
      boxShadow: hover && !disabled && !active ? "var(--shadow-primary-glow)" : "none"
    },
    secondary: {
      background: hover && !disabled ? "var(--surface-raised)" : "transparent",
      color: "var(--text-primary)",
      borderColor: "var(--border-default)"
    },
    ghost: {
      background: hover && !disabled ? "var(--surface-raised)" : "transparent",
      color: "var(--text-primary)"
    },
    destructive: {
      background: hover && !disabled ? "#B91C1C" : "var(--error)",
      color: "var(--text-on-primary)"
    }
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setActive(false);
    },
    onMouseDown: () => setActive(true),
    onMouseUp: () => setActive(false),
    style: {
      ...base,
      ...(variants[variant] || variants.primary),
      ...style
    }
  }, rest), iconLeft, children, iconRight);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Button.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
/**
 * Ember Studio — Checkbox
 * Square 18px control with terracotta fill when checked.
 */
function Checkbox({
  checked,
  defaultChecked,
  onChange,
  label,
  disabled = false,
  id,
  style = {}
}) {
  const inputId = id || React.useId();
  const [internal, setInternal] = React.useState(defaultChecked || false);
  const isChecked = checked !== undefined ? checked : internal;
  const toggle = e => {
    if (disabled) return;
    if (checked === undefined) setInternal(e.target.checked);
    onChange && onChange(e);
  };
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "10px",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      width: "18px",
      height: "18px",
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement("input", {
    id: inputId,
    type: "checkbox",
    checked: isChecked,
    disabled: disabled,
    onChange: toggle,
    style: {
      position: "absolute",
      opacity: 0,
      width: "100%",
      height: "100%",
      margin: 0,
      cursor: "inherit"
    }
  }), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "18px",
      height: "18px",
      borderRadius: "var(--radius-sm)",
      border: "1px solid " + (isChecked ? "var(--primary)" : "var(--border-strong)"),
      background: isChecked ? "var(--primary)" : "var(--surface-card)",
      transition: "background var(--dur-fast) var(--ease-standard), border-color var(--dur-fast) var(--ease-standard)"
    }
  }, isChecked && /*#__PURE__*/React.createElement("svg", {
    width: "11",
    height: "11",
    viewBox: "0 0 12 12",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M2.5 6.2L5 8.7L9.7 3.5",
    stroke: "#fff",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })))), label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--fs-body)",
      color: "var(--text-primary)"
    }
  }, label));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Ember Studio — IconButton
 * Square, icon-only button for toolbars and rows. Pass a Lucide icon as children.
 */
function IconButton({
  variant = "ghost",
  size = "md",
  disabled = false,
  "aria-label": ariaLabel,
  onClick,
  children,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const dim = size === "sm" ? 32 : size === "lg" ? 48 : 40;
  const variants = {
    ghost: {
      background: hover && !disabled ? "var(--surface-raised)" : "transparent",
      color: "var(--text-secondary)",
      border: "1px solid transparent"
    },
    outline: {
      background: hover && !disabled ? "var(--surface-raised)" : "transparent",
      color: "var(--text-primary)",
      border: "1px solid var(--border-default)"
    },
    primary: {
      background: hover && !disabled ? "var(--primary-hover)" : "var(--primary)",
      color: "var(--text-on-primary)",
      border: "1px solid transparent"
    }
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    "aria-label": ariaLabel,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: dim + "px",
      height: dim + "px",
      borderRadius: "var(--radius-md)",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      transition: "background var(--dur-fast) var(--ease-standard), color var(--dur-fast) var(--ease-standard)",
      ...(variants[variant] || variants.ghost),
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Ember Studio — Input
 * Labeled text input. Focus = terracotta border + warm ring. Error state turns border red.
 */
function Input({
  label,
  hint,
  error,
  id,
  type = "text",
  disabled = false,
  value,
  defaultValue,
  placeholder,
  onChange,
  style = {},
  ...rest
}) {
  const [focused, setFocused] = React.useState(false);
  const inputId = id || React.useId();
  const borderColor = error ? "var(--error)" : focused ? "var(--primary)" : "var(--border-default)";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "6px",
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    style: {
      fontSize: "var(--fs-small)",
      fontWeight: "var(--fw-semibold)",
      color: "var(--text-primary)"
    }
  }, label), /*#__PURE__*/React.createElement("input", _extends({
    id: inputId,
    type: type,
    disabled: disabled,
    value: value,
    defaultValue: defaultValue,
    placeholder: placeholder,
    onChange: onChange,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "var(--fs-body)",
      color: "var(--text-primary)",
      background: "var(--surface-card)",
      padding: "12px",
      borderRadius: "var(--radius-md)",
      border: "1px solid " + borderColor,
      boxShadow: focused && !error ? "var(--ring-focus)" : "none",
      outline: "none",
      opacity: disabled ? 0.5 : 1,
      transition: "border-color var(--dur-fast) var(--ease-standard), box-shadow var(--dur-fast) var(--ease-standard)"
    }
  }, rest)), (hint || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--fs-caption)",
      color: error ? "var(--error)" : "var(--text-muted)"
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Ember Studio — Select
 * Labeled native select styled to match Input. 8px radius, warm border, focus ring.
 */
function Select({
  label,
  hint,
  id,
  disabled = false,
  value,
  defaultValue,
  onChange,
  options = [],
  children,
  style = {},
  ...rest
}) {
  const [focused, setFocused] = React.useState(false);
  const selectId = id || React.useId();
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "6px",
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: selectId,
    style: {
      fontSize: "var(--fs-small)",
      fontWeight: "var(--fw-semibold)",
      color: "var(--text-primary)"
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex"
    }
  }, /*#__PURE__*/React.createElement("select", _extends({
    id: selectId,
    disabled: disabled,
    value: value,
    defaultValue: defaultValue,
    onChange: onChange,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    style: {
      appearance: "none",
      width: "100%",
      fontFamily: "var(--font-body)",
      fontSize: "var(--fs-body)",
      color: "var(--text-primary)",
      background: "var(--surface-card)",
      padding: "12px 36px 12px 12px",
      borderRadius: "var(--radius-md)",
      border: "1px solid " + (focused ? "var(--primary)" : "var(--border-default)"),
      boxShadow: focused ? "var(--ring-focus)" : "none",
      outline: "none",
      opacity: disabled ? 0.5 : 1,
      cursor: disabled ? "not-allowed" : "pointer",
      transition: "border-color var(--dur-fast) var(--ease-standard), box-shadow var(--dur-fast) var(--ease-standard)"
    }
  }, rest), options.map(o => /*#__PURE__*/React.createElement("option", {
    key: o.value,
    value: o.value
  }, o.label)), children), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      right: "12px",
      top: "50%",
      transform: "translateY(-50%)",
      pointerEvents: "none",
      color: "var(--text-muted)",
      display: "flex"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 16 16",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M4 6l4 4 4-4",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })))), hint && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--fs-caption)",
      color: "var(--text-muted)"
    }
  }, hint));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
/**
 * Ember Studio — Switch
 * Pill toggle; terracotta track when on. For settings and on/off prefs.
 */
function Switch({
  checked,
  defaultChecked,
  onChange,
  label,
  disabled = false,
  id,
  style = {}
}) {
  const inputId = id || React.useId();
  const [internal, setInternal] = React.useState(defaultChecked || false);
  const isOn = checked !== undefined ? checked : internal;
  const toggle = e => {
    if (disabled) return;
    if (checked === undefined) setInternal(e.target.checked);
    onChange && onChange(e);
  };
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "10px",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      width: "38px",
      height: "22px",
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement("input", {
    id: inputId,
    type: "checkbox",
    checked: isOn,
    disabled: disabled,
    onChange: toggle,
    style: {
      position: "absolute",
      opacity: 0,
      width: "100%",
      height: "100%",
      margin: 0,
      cursor: "inherit"
    }
  }), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      display: "block",
      width: "38px",
      height: "22px",
      borderRadius: "var(--radius-full)",
      background: isOn ? "var(--primary)" : "var(--surface-raised)",
      border: "1px solid " + (isOn ? "var(--primary)" : "var(--border-default)"),
      transition: "background var(--dur-fast) var(--ease-standard)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      top: "3px",
      left: isOn ? "19px" : "3px",
      width: "16px",
      height: "16px",
      borderRadius: "var(--radius-full)",
      background: "#fff",
      boxShadow: "0 1px 2px rgba(28,25,23,0.25)",
      transition: "left var(--dur-fast) var(--ease-standard)"
    }
  })), label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--fs-body)",
      color: "var(--text-primary)"
    }
  }, label));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
/**
 * Ember Studio — Tabs
 * Underline-style tabs. Active = terracotta text + 2px bottom border.
 * Controlled via `value`/`onChange` or uncontrolled via `defaultValue`.
 */
function Tabs({
  items = [],
  value,
  defaultValue,
  onChange,
  style = {}
}) {
  const [internal, setInternal] = React.useState(defaultValue ?? (items[0] && items[0].value));
  const active = value !== undefined ? value : internal;
  const [hover, setHover] = React.useState(null);
  const select = v => {
    if (value === undefined) setInternal(v);
    onChange && onChange(v);
  };
  return /*#__PURE__*/React.createElement("div", {
    role: "tablist",
    style: {
      display: "flex",
      gap: "4px",
      borderBottom: "1px solid var(--border-default)",
      ...style
    }
  }, items.map(it => {
    const isActive = it.value === active;
    return /*#__PURE__*/React.createElement("button", {
      key: it.value,
      role: "tab",
      "aria-selected": isActive,
      onClick: () => select(it.value),
      onMouseEnter: () => setHover(it.value),
      onMouseLeave: () => setHover(null),
      style: {
        appearance: "none",
        border: "none",
        background: hover === it.value && !isActive ? "var(--surface-raised)" : "transparent",
        fontFamily: "var(--font-body)",
        fontSize: "var(--fs-small)",
        fontWeight: "var(--fw-semibold)",
        color: isActive ? "var(--primary)" : "var(--text-secondary)",
        padding: "10px 12px",
        cursor: "pointer",
        borderRadius: "var(--radius-md) var(--radius-md) 0 0",
        boxShadow: isActive ? "inset 0 -2px 0 var(--primary)" : "none",
        transition: "color var(--dur-fast) var(--ease-standard), background var(--dur-fast) var(--ease-standard)"
      }
    }, it.label, it.count != null && /*#__PURE__*/React.createElement("span", {
      style: {
        marginLeft: "6px",
        fontSize: "var(--fs-caption)",
        color: "var(--text-muted)",
        fontVariantNumeric: "tabular-nums"
      }
    }, it.count));
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/App.jsx
try { (() => {
// Ember Studio — App shell orchestrator
const {
  Dialog,
  Button,
  Input,
  Select,
  Toast
} = window.EmberStudioDesignSystem_c8a645;
const Sidebar = window.ESSidebar;
const Topbar = window.ESTopbar;
const Dashboard = window.ESDashboard;
const ProjectDetail = window.ESProjectDetail;
function App() {
  const [view, setView] = React.useState("dashboard"); // dashboard | project
  const [current, setCurrent] = React.useState(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [toast, setToast] = React.useState(null);
  React.useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3200);
    return () => clearTimeout(t);
  }, [toast]);
  const openProject = p => {
    setCurrent(p);
    setView("project");
  };
  const heading = view === "project" ? {
    title: "Projects",
    subtitle: "Atelier North workspace"
  } : {
    title: "Good afternoon, Mara",
    subtitle: "Here's what's happening across your studio"
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      height: "100vh",
      overflow: "hidden",
      background: "var(--bg-page)"
    }
  }, /*#__PURE__*/React.createElement(Sidebar, {
    view: view,
    onNavigate: v => {
      setView(v);
      if (v === "project" && !current) setCurrent(window.ES_DATA.projects[0]);
    }
  }), /*#__PURE__*/React.createElement("main", {
    style: {
      flex: 1,
      height: "100%",
      overflowY: "auto"
    }
  }, /*#__PURE__*/React.createElement(Topbar, {
    title: heading.title,
    subtitle: heading.subtitle,
    onNewProject: () => setDialogOpen(true)
  }), view === "dashboard" ? /*#__PURE__*/React.createElement(Dashboard, {
    onOpenProject: openProject
  }) : /*#__PURE__*/React.createElement(ProjectDetail, {
    project: current,
    onBack: () => setView("dashboard")
  })), /*#__PURE__*/React.createElement(Dialog, {
    open: dialogOpen,
    onClose: () => setDialogOpen(false),
    title: "New project",
    description: "Give your project a name and set who's leading it. You can add tasks next.",
    footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      onClick: () => setDialogOpen(false)
    }, "Cancel"), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      onClick: () => {
        setDialogOpen(false);
        setToast({
          tone: "success",
          title: "Project created",
          message: "Autumn Campaign is ready."
        });
      }
    }, "Create project"))
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "16px"
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Project name",
    placeholder: "e.g. Autumn Campaign",
    defaultValue: ""
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "16px"
    }
  }, /*#__PURE__*/React.createElement(Select, {
    label: "Team",
    options: [{
      value: "design",
      label: "Design"
    }, {
      value: "marketing",
      label: "Marketing"
    }]
  }), /*#__PURE__*/React.createElement(Select, {
    label: "Priority",
    options: [{
      value: "low",
      label: "Low"
    }, {
      value: "med",
      label: "Medium"
    }, {
      value: "high",
      label: "High"
    }],
    defaultValue: "med"
  })))), toast && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      bottom: "24px",
      right: "24px",
      zIndex: 1100
    }
  }, /*#__PURE__*/React.createElement(Toast, {
    tone: toast.tone,
    title: toast.title,
    message: toast.message,
    onDismiss: () => setToast(null)
  })));
}
window.ESApp = App;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/Dashboard.jsx
try { (() => {
const Icon = window.ESIcon;
// Ember Studio — Dashboard (projects grid + stats + activity)
const {
  Card,
  Badge,
  Avatar,
  ProgressBar,
  Chip
} = window.EmberStudioDesignSystem_c8a645;
function Stat({
  icon,
  label,
  value,
  tone
}) {
  return /*#__PURE__*/React.createElement(Card, {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "12px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: 40,
      height: 40,
      borderRadius: "var(--radius-md)",
      background: tone,
      color: "#fff",
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    style: {
      width: 20,
      height: 20
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      lineHeight: 1.2
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 700,
      fontSize: "26px",
      letterSpacing: "-0.02em",
      color: "var(--text-primary)"
    }
  }, value), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--fs-small)",
      color: "var(--text-muted)"
    }
  }, label))));
}
function ProjectCard({
  p,
  onOpen
}) {
  return /*#__PURE__*/React.createElement(Card, {
    interactive: true,
    stripe: p.color,
    onClick: () => onOpen(p),
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "12px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: "8px"
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: "18px",
      margin: 0
    }
  }, p.name), /*#__PURE__*/React.createElement(Badge, {
    tone: p.status,
    dot: p.status !== "primary"
  }, p.statusLabel)), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--fs-small)",
      color: "var(--text-secondary)",
      margin: 0,
      minHeight: "38px"
    }
  }, p.desc), /*#__PURE__*/React.createElement(ProgressBar, {
    value: p.done,
    max: p.total
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex"
    }
  }, p.team.slice(0, 4).map((n, i) => /*#__PURE__*/React.createElement(Avatar, {
    key: n,
    name: n,
    size: 26,
    stacked: i > 0
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "6px",
      fontSize: "var(--fs-caption)",
      color: "var(--text-muted)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "calendar",
    style: {
      width: 13,
      height: 13
    }
  }), /*#__PURE__*/React.createElement("span", null, "Due ", p.due), /*#__PURE__*/React.createElement("span", {
    style: {
      margin: "0 2px"
    }
  }, "\xB7"), /*#__PURE__*/React.createElement("span", null, p.done, "/", p.total))));
}
function Dashboard({
  onOpenProject
}) {
  const d = window.ES_DATA;
  const [filter, setFilter] = React.useState("all");
  const filters = [{
    v: "all",
    l: "All projects"
  }, {
    v: "mine",
    l: "Mine"
  }, {
    v: "design",
    l: "Design"
  }, {
    v: "marketing",
    l: "Marketing"
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "32px",
      maxWidth: "var(--container-max)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "16px",
      marginBottom: "32px"
    }
  }, /*#__PURE__*/React.createElement(Stat, {
    icon: "folder-kanban",
    label: "Active projects",
    value: "6",
    tone: "var(--primary)"
  }), /*#__PURE__*/React.createElement(Stat, {
    icon: "circle-check-big",
    label: "Tasks completed",
    value: "69",
    tone: "var(--success)"
  }), /*#__PURE__*/React.createElement(Stat, {
    icon: "clock",
    label: "Due this week",
    value: "4",
    tone: "var(--warning)"
  }), /*#__PURE__*/React.createElement(Stat, {
    icon: "users",
    label: "Team members",
    value: "7",
    tone: "var(--project-blue)"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "16px"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: "var(--fs-section)",
      margin: 0
    }
  }, "Your projects"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "8px"
    }
  }, filters.map(f => /*#__PURE__*/React.createElement(Chip, {
    key: f.v,
    active: filter === f.v,
    onClick: () => setFilter(f.v)
  }, f.l)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "var(--grid-gap-lg)"
    }
  }, d.projects.map(p => /*#__PURE__*/React.createElement(ProjectCard, {
    key: p.id,
    p: p,
    onOpen: onOpenProject
  }))), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: "var(--fs-section)",
      margin: "40px 0 16px"
    }
  }, "Recent activity"), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column"
    }
  }, d.activity.map((a, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      padding: "12px 0",
      borderTop: i ? "1px solid var(--border-subtle)" : "none"
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: a.who,
    size: 28
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      fontSize: "var(--fs-small)",
      color: "var(--text-secondary)"
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: "var(--text-primary)",
      fontWeight: "var(--fw-semibold)"
    }
  }, a.who), " ", a.what, " ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: "var(--text-primary)",
      fontWeight: "var(--fw-semibold)"
    }
  }, a.obj)), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--fs-caption)",
      color: "var(--text-muted)"
    }
  }, a.when))))));
}
window.ESDashboard = Dashboard;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/Dashboard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/Icon.jsx
try { (() => {
// Ember Studio — Icon helper
// Renders a Lucide glyph as inline SVG inside a ref'd leaf <span>.
// React never manages the SVG children, so navigation re-renders can't crash
// (unlike global lucide.createIcons(), which mutates React-owned <i> nodes).
function Icon({
  name,
  size = 18,
  style = {}
}) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const L = window.lucide;
    if (!ref.current || !L) return;
    const pascal = String(name).split("-").map(s => s.charAt(0).toUpperCase() + s.slice(1)).join("");
    const node = L.icons && L.icons[pascal] || L[pascal];
    if (!node || !Array.isArray(node)) {
      ref.current.innerHTML = "";
      return;
    }
    const children = node.map(([tag, attrs]) => {
      const a = Object.entries(attrs || {}).map(([k, v]) => `${k}="${v}"`).join(" ");
      return `<${tag} ${a}></${tag}>`;
    }).join("");
    ref.current.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${children}</svg>`;
  }, [name, size]);
  return /*#__PURE__*/React.createElement("span", {
    ref: ref,
    "aria-hidden": "true",
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: size,
      height: size,
      flex: "none",
      ...style
    }
  });
}
window.ESIcon = Icon;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/Icon.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/ProjectDetail.jsx
try { (() => {
const Icon = window.ESIcon;
// Ember Studio — Project detail (tabs, task list, sidebar meta)
const {
  Card,
  Badge,
  Avatar,
  ProgressBar,
  Tabs,
  Checkbox,
  Button,
  IconButton,
  Chip
} = window.EmberStudioDesignSystem_c8a645;
function TaskRow({
  task,
  onToggle
}) {
  const [hover, setHover] = React.useState(false);
  const prTone = {
    high: "error",
    med: "warning",
    low: "neutral"
  }[task.priority];
  const prLabel = {
    high: "High",
    med: "Medium",
    low: "Low"
  }[task.priority];
  return /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "flex",
      alignItems: "center",
      gap: "14px",
      padding: "12px 12px",
      borderRadius: "var(--radius-md)",
      background: hover ? "var(--surface-raised)" : "transparent",
      transition: "background var(--dur-fast) var(--ease-standard)"
    }
  }, /*#__PURE__*/React.createElement(Checkbox, {
    checked: task.done,
    onChange: () => onToggle(task.id)
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontSize: "var(--fs-body)",
      color: task.done ? "var(--text-muted)" : "var(--text-primary)",
      textDecoration: task.done ? "line-through" : "none"
    }
  }, task.title), /*#__PURE__*/React.createElement(Badge, {
    tone: prTone
  }, prLabel), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "6px",
      width: "92px",
      justifyContent: "flex-end",
      fontSize: "var(--fs-caption)",
      color: task.due === "Done" ? "var(--success)" : "var(--text-muted)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: task.due === "Done" ? "check" : "calendar",
    style: {
      width: 13,
      height: 13
    }
  }), task.due), /*#__PURE__*/React.createElement(Avatar, {
    name: task.assignee,
    size: 26
  }));
}
function ProjectDetail({
  project,
  onBack
}) {
  const d = window.ES_DATA;
  const p = project || d.projects[0];
  const [tab, setTab] = React.useState("tasks");
  const [tasks, setTasks] = React.useState(d.tasks);
  const toggle = id => setTasks(ts => ts.map(t => t.id === id ? {
    ...t,
    done: !t.done,
    due: !t.done ? "Done" : t.due
  } : t));
  const doneCount = tasks.filter(t => t.done).length;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "24px 32px 40px",
      maxWidth: "var(--container-max)"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onBack,
    style: {
      display: "flex",
      alignItems: "center",
      gap: "6px",
      appearance: "none",
      border: "none",
      background: "transparent",
      cursor: "pointer",
      color: "var(--text-muted)",
      fontFamily: "var(--font-body)",
      fontSize: "var(--fs-small)",
      fontWeight: "var(--fw-semibold)",
      padding: "4px 0 16px"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-left",
    style: {
      width: 16,
      height: 16
    }
  }), " All projects"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      gap: "16px",
      marginBottom: "8px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 38,
      borderRadius: "var(--radius-full)",
      background: p.color,
      marginTop: "4px",
      flex: "none"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "12px"
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: "var(--fs-headline)",
      margin: 0,
      lineHeight: 1
    }
  }, p.name), /*#__PURE__*/React.createElement(Badge, {
    tone: p.status,
    dot: p.status !== "primary"
  }, p.statusLabel)), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--fs-body)",
      color: "var(--text-secondary)",
      margin: "8px 0 0",
      maxWidth: "640px"
    }
  }, p.desc)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "8px"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "user-plus",
      style: {
        width: 16,
        height: 16
      }
    })
  }, "Invite"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "plus",
      style: {
        width: 16,
        height: 16
      }
    })
  }, "Add task"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 280px",
      gap: "24px",
      marginTop: "20px",
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Tabs, {
    value: tab,
    onChange: setTab,
    items: [{
      value: "tasks",
      label: "Tasks",
      count: tasks.length
    }, {
      value: "files",
      label: "Files",
      count: 9
    }, {
      value: "activity",
      label: "Activity"
    }]
  }), /*#__PURE__*/React.createElement(Card, {
    style: {
      marginTop: "16px",
      padding: "8px"
    }
  }, tab === "tasks" && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column"
    }
  }, tasks.map(t => /*#__PURE__*/React.createElement(TaskRow, {
    key: t.id,
    task: t,
    onToggle: toggle
  }))), tab === "files" && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "32px",
      textAlign: "center",
      color: "var(--text-muted)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "folder-open",
    style: {
      width: 28,
      height: 28
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: "8px",
      fontSize: "var(--fs-small)"
    }
  }, "9 files \xB7 drag here to upload")), tab === "activity" && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "16px"
    }
  }, d.activity.map((a, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      padding: "10px 0",
      borderTop: i ? "1px solid var(--border-subtle)" : "none"
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: a.who,
    size: 26
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontSize: "var(--fs-small)",
      color: "var(--text-secondary)"
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: "var(--text-primary)"
    }
  }, a.who), " ", a.what, " ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: "var(--text-primary)"
    }
  }, a.obj)), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--fs-caption)",
      color: "var(--text-muted)"
    }
  }, a.when)))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "16px"
    }
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("div", {
    className: "overline",
    style: {
      marginBottom: "10px"
    }
  }, "Progress"), /*#__PURE__*/React.createElement(ProgressBar, {
    value: doneCount,
    max: tasks.length,
    showPercent: true,
    label: `${doneCount} of ${tasks.length} tasks`
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "8px",
      marginTop: "16px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--fs-caption)",
      color: "var(--text-muted)"
    }
  }, "Due date"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--fs-small)",
      fontWeight: "var(--fw-semibold)",
      color: "var(--text-primary)"
    }
  }, p.due)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--fs-caption)",
      color: "var(--text-muted)"
    }
  }, "Priority"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--fs-small)",
      fontWeight: "var(--fw-semibold)",
      color: "var(--text-primary)"
    }
  }, "High")))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("div", {
    className: "overline",
    style: {
      marginBottom: "12px"
    }
  }, "Team"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "10px"
    }
  }, p.team.map(n => /*#__PURE__*/React.createElement("div", {
    key: n,
    style: {
      display: "flex",
      alignItems: "center",
      gap: "10px"
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: n,
    size: 28
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--fs-small)",
      color: "var(--text-primary)"
    }
  }, n))))))));
}
window.ESProjectDetail = ProjectDetail;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/ProjectDetail.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/Sidebar.jsx
try { (() => {
const Icon = window.ESIcon;
// Ember Studio — Sidebar (256px app navigation)
const {
  Avatar
} = window.EmberStudioDesignSystem_c8a645;
function NavItem({
  icon,
  label,
  active,
  badge,
  onClick
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      gap: "12px",
      width: "100%",
      appearance: "none",
      border: "none",
      textAlign: "left",
      cursor: "pointer",
      fontFamily: "var(--font-body)",
      fontSize: "var(--fs-small)",
      fontWeight: "var(--fw-semibold)",
      color: active ? "var(--primary)" : "var(--text-secondary)",
      background: active ? "var(--primary-tint)" : hover ? "var(--surface-raised)" : "transparent",
      padding: "9px 12px",
      borderRadius: "var(--radius-md)",
      transition: "background var(--dur-fast) var(--ease-standard), color var(--dur-fast) var(--ease-standard)"
    }
  }, active && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      left: 0,
      top: "8px",
      bottom: "8px",
      width: "3px",
      borderRadius: "var(--radius-full)",
      background: "var(--primary)"
    }
  }), /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    style: {
      width: 18,
      height: 18,
      flex: "none"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }, label), badge != null && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--fs-caption)",
      color: "var(--text-muted)",
      fontVariantNumeric: "tabular-nums"
    }
  }, badge));
}
function SectionLabel({
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--fs-overline)",
      textTransform: "uppercase",
      letterSpacing: "var(--ls-overline)",
      fontWeight: "var(--fw-semibold)",
      color: "var(--text-muted)",
      padding: "0 12px",
      margin: "20px 0 8px"
    }
  }, children);
}
function Sidebar({
  view,
  onNavigate
}) {
  const d = window.ES_DATA;
  return /*#__PURE__*/React.createElement("aside", {
    style: {
      width: "var(--sidebar-width)",
      flex: "none",
      height: "100%",
      boxSizing: "border-box",
      background: "var(--surface-card)",
      borderRight: "1px solid var(--border-default)",
      display: "flex",
      flexDirection: "column",
      padding: "20px 12px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      padding: "0 8px 4px"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo-mark.svg",
    width: "28",
    height: "28",
    alt: ""
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      lineHeight: 1.2
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 700,
      letterSpacing: "-0.02em",
      fontSize: "18px",
      color: "var(--text-primary)"
    }
  }, "Ember Studio"))), /*#__PURE__*/React.createElement("button", {
    onClick: () => onNavigate("dashboard"),
    style: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      width: "100%",
      marginTop: "16px",
      appearance: "none",
      cursor: "pointer",
      textAlign: "left",
      background: "var(--surface-raised)",
      border: "1px solid var(--border-default)",
      borderRadius: "var(--radius-md)",
      padding: "8px 10px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: 28,
      height: 28,
      borderRadius: "var(--radius-md)",
      background: "var(--primary)",
      color: "#fff",
      fontFamily: "var(--font-display)",
      fontWeight: 700
    }
  }, "A"), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      lineHeight: 1.2
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      fontSize: "var(--fs-small)",
      fontWeight: "var(--fw-semibold)",
      color: "var(--text-primary)"
    }
  }, d.workspace.name), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      fontSize: "var(--fs-caption)",
      color: "var(--text-muted)"
    }
  }, d.workspace.plan)), /*#__PURE__*/React.createElement(Icon, {
    name: "chevrons-up-down",
    style: {
      width: 16,
      height: 16,
      color: "var(--text-muted)"
    }
  })), /*#__PURE__*/React.createElement(SectionLabel, null, "Workspace"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "2px"
    }
  }, /*#__PURE__*/React.createElement(NavItem, {
    icon: "layout-dashboard",
    label: "Dashboard",
    active: view === "dashboard",
    onClick: () => onNavigate("dashboard")
  }), /*#__PURE__*/React.createElement(NavItem, {
    icon: "folder-kanban",
    label: "Projects",
    badge: d.projects.length,
    active: view === "project",
    onClick: () => onNavigate("project")
  }), /*#__PURE__*/React.createElement(NavItem, {
    icon: "circle-check-big",
    label: "My tasks",
    badge: 4,
    onClick: () => onNavigate("dashboard")
  }), /*#__PURE__*/React.createElement(NavItem, {
    icon: "calendar",
    label: "Calendar",
    onClick: () => onNavigate("dashboard")
  }), /*#__PURE__*/React.createElement(NavItem, {
    icon: "folder-open",
    label: "Files",
    onClick: () => onNavigate("dashboard")
  })), /*#__PURE__*/React.createElement(SectionLabel, null, "Teams"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "2px"
    }
  }, /*#__PURE__*/React.createElement(NavItem, {
    icon: "palette",
    label: "Design",
    onClick: () => onNavigate("dashboard")
  }), /*#__PURE__*/React.createElement(NavItem, {
    icon: "megaphone",
    label: "Marketing",
    onClick: () => onNavigate("dashboard")
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "auto",
      display: "flex",
      alignItems: "center",
      gap: "10px",
      padding: "10px 8px 0",
      borderTop: "1px solid var(--border-subtle)"
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: d.user.name,
    size: 32
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontSize: "var(--fs-small)",
      fontWeight: "var(--fw-semibold)",
      color: "var(--text-primary)"
    }
  }, d.user.name), /*#__PURE__*/React.createElement(Icon, {
    name: "settings",
    style: {
      width: 18,
      height: 18,
      color: "var(--text-muted)"
    }
  })));
}
window.ESSidebar = Sidebar;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/Sidebar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/Topbar.jsx
try { (() => {
const Icon = window.ESIcon;
// Ember Studio — Topbar (page header with search + new project)
const {
  Button,
  IconButton
} = window.EmberStudioDesignSystem_c8a645;
function Topbar({
  title,
  subtitle,
  onNewProject
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "16px",
      padding: "16px 32px",
      borderBottom: "1px solid var(--border-default)",
      background: "color-mix(in srgb, var(--bg-page) 70%, transparent)",
      backdropFilter: "blur(8px)",
      WebkitBackdropFilter: "blur(8px)",
      position: "sticky",
      top: 0,
      zIndex: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: "var(--fs-section)",
      lineHeight: 1.1,
      margin: 0
    }
  }, title), subtitle && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--fs-small)",
      color: "var(--text-muted)",
      marginTop: "2px"
    }
  }, subtitle)), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: "240px"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    style: {
      position: "absolute",
      left: 12,
      top: "50%",
      transform: "translateY(-50%)",
      width: 16,
      height: 16,
      color: "var(--text-muted)"
    }
  }), /*#__PURE__*/React.createElement("input", {
    placeholder: "Search projects, tasks\u2026",
    style: {
      width: "100%",
      boxSizing: "border-box",
      fontFamily: "var(--font-body)",
      fontSize: "var(--fs-small)",
      color: "var(--text-primary)",
      background: "var(--surface-card)",
      border: "1px solid var(--border-default)",
      borderRadius: "var(--radius-md)",
      padding: "9px 12px 9px 34px",
      outline: "none"
    }
  })), /*#__PURE__*/React.createElement(IconButton, {
    variant: "outline",
    "aria-label": "Notifications"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      display: "flex"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "bell",
    style: {
      width: 18,
      height: 18
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: -2,
      right: -2,
      width: 7,
      height: 7,
      borderRadius: "var(--radius-full)",
      background: "var(--accent)",
      border: "1.5px solid var(--surface-card)"
    }
  }))), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: onNewProject,
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "plus",
      style: {
        width: 18,
        height: 18
      }
    })
  }, "New project"));
}
window.ESTopbar = Topbar;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/Topbar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/data.js
try { (() => {
// Ember Studio — mock data for the UI kit (plain script; attaches to window)
window.ES_DATA = {
  workspace: {
    name: "Atelier North",
    plan: "Studio plan"
  },
  user: {
    name: "Mara Ito"
  },
  projects: [{
    id: "p1",
    name: "Autumn Rebrand",
    color: "var(--project-amber)",
    done: 12,
    total: 18,
    due: "Jun 12",
    status: "warning",
    statusLabel: "Due soon",
    team: ["Mara Ito", "Joel Park", "Sun Lee"],
    desc: "New identity system, palette, and guidelines for the autumn campaign."
  }, {
    id: "p2",
    name: "Studio Site Refresh",
    color: "var(--project-terracotta)",
    done: 27,
    total: 30,
    due: "Jun 28",
    status: "primary",
    statusLabel: "In review",
    team: ["Joel Park", "Ana Diaz"],
    desc: "Marketing site rebuild with the new component library."
  }, {
    id: "p3",
    name: "Q3 Print Catalog",
    color: "var(--project-green)",
    done: 8,
    total: 24,
    due: "Jul 09",
    status: "success",
    statusLabel: "On track",
    team: ["Sun Lee", "Mara Ito", "Ana Diaz", "Theo Bell"],
    desc: "48-page seasonal catalog, layout and pre-press."
  }, {
    id: "p4",
    name: "Packaging — Ember Tea",
    color: "var(--project-violet)",
    done: 3,
    total: 16,
    due: "Jun 03",
    status: "error",
    statusLabel: "Overdue",
    team: ["Theo Bell", "Mara Ito"],
    desc: "Box and label system for the new tea line."
  }, {
    id: "p5",
    name: "Brand Photography",
    color: "var(--project-blue)",
    done: 14,
    total: 20,
    due: "Jul 22",
    status: "success",
    statusLabel: "On track",
    team: ["Ana Diaz"],
    desc: "Warm, golden-hour shoot for product and lifestyle."
  }, {
    id: "p6",
    name: "Motion Reel 2026",
    color: "var(--project-rose)",
    done: 5,
    total: 12,
    due: "Aug 01",
    status: "success",
    statusLabel: "On track",
    team: ["Joel Park", "Theo Bell"],
    desc: "Title sequences and social cutdowns."
  }],
  tasks: [{
    id: "t1",
    title: "Finalize color palette",
    done: true,
    assignee: "Mara Ito",
    due: "Done",
    priority: "high"
  }, {
    id: "t2",
    title: "Draft logo lockups (3 directions)",
    done: true,
    assignee: "Joel Park",
    due: "Done",
    priority: "high"
  }, {
    id: "t3",
    title: "Type pairing exploration",
    done: false,
    assignee: "Sun Lee",
    due: "Jun 09",
    priority: "med"
  }, {
    id: "t4",
    title: "Build guideline deck — foundations",
    done: false,
    assignee: "Mara Ito",
    due: "Jun 11",
    priority: "med"
  }, {
    id: "t5",
    title: "Iconography set (24 glyphs)",
    done: false,
    assignee: "Joel Park",
    due: "Jun 12",
    priority: "low"
  }, {
    id: "t6",
    title: "Stakeholder review prep",
    done: false,
    assignee: "Sun Lee",
    due: "Jun 12",
    priority: "high"
  }],
  activity: [{
    who: "Joel Park",
    what: "completed",
    obj: "Draft logo lockups",
    when: "2h ago"
  }, {
    who: "Sun Lee",
    what: "commented on",
    obj: "Type pairing exploration",
    when: "4h ago"
  }, {
    who: "Mara Ito",
    what: "uploaded 6 files to",
    obj: "Brand Photography",
    when: "yesterday"
  }, {
    who: "Ana Diaz",
    what: "created",
    obj: "Q3 Print Catalog",
    when: "2 days ago"
  }]
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/data.js", error: String((e && e.message) || e) }); }

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Chip = __ds_scope.Chip;

__ds_ns.ProgressBar = __ds_scope.ProgressBar;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Tabs = __ds_scope.Tabs;

})();
