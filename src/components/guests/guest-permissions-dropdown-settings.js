import chroma from "chroma-js";

export const priorityOptions = [
  { value: "1", label: "Read", color: "#2076CB" },
  { value: "2", label: "Edit tasks", color: "#50A154" },
  { value: "3", label: "Edit and Delete tasks", color: "rgb(255, 140, 0)" },
  { value: "4", label: "Owner", color: "rgb(231, 15, 15)" },
];

// export const selectPriorityOption = {
//   VIEWER: 2,
//   EDITOR_RW: 3,
//   EDITOR_RWD: 4,"#b2b200"
//   OWNER: 5,
// };

export const convertToPermissionsEnum = {
  1: "VIEWER",
  2: "EDITOR_RW",
  3: "EDITOR_RWD",
  4: "OWNER",
};

const dot = (color = "transparent") => ({
  alignItems: "center",
  display: "flex",

  ":before": {
    backgroundColor: color,
    borderRadius: 10,
    content: '" "',
    display: "block",
    marginRight: 8,
    height: 10,
    width: 10,
  },
});

export const colourStyles = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "white",
    fontSize: "0.8rem",
    height: "1.75rem",
    minHeight: "1.75rem",
  }),
  menu: (styles) => ({
    ...styles,
    background: "white",
    width: "13.2rem",
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: isDisabled
        ? undefined
        : isSelected
        ? data.color
        : isFocused
        ? color.alpha(0.1).css()
        : undefined,
      color: isDisabled
        ? "#ccc"
        : isSelected
        ? chroma.contrast(color, "white") > 2
          ? "white"
          : "black"
        : data.color,
      cursor: isDisabled ? "not-allowed" : "default",
      fontSize: "0.8rem",
      fontWeight: "600",

      ":active": {
        ...styles[":active"],
        backgroundColor: !isDisabled
          ? isSelected
            ? data.color
            : color.alpha(0.3).css()
          : undefined,
      },
    };
  },
  input: (styles) => ({ ...styles, ...dot() }),
  placeholder: (styles) => ({ ...styles, ...dot("#ccc") }),
  singleValue: (styles, { data }) => ({
    ...styles,
    ...dot(data.color),
  }),
  indicatorsContainer: (providedStyles) => ({
    ...providedStyles,
    height: "1.6rem",
  }),
};
