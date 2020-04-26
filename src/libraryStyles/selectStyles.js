const colourStyles = {
  container: (base, state) => ({
    ...base,
    border: state.isFocused ? null : null,
    transition:
      "border-color 0.2s ease, box-shadow 0.2s ease, padding 0.2s ease",
    "&:hover": {
      boxShadow: "0 2px 4px 0 rgba(41, 56, 78, 0.1)",
    },
  }),
  control: (base, state) => ({
    ...base,
    background: "none",
    border: "1px solid rgba(255, 255, 255, .1)",
    borderRadius: "none",
  }),
  valueContainer: (base, state) => ({
    ...base,
    background: "none",
    color: "white",
  }),
  menu: (base, state) => ({
    ...base,
    background: "#3d3850",
    zIndex: "2",
  }),
  menuList: (base, state) => ({
    ...base,
    background: "#3d3850",
    color: "white",
  }),
  placeholder: (base, state) => ({
    ...base,
    color: "white",
    opacity: ".5",
  }),
  input: (base, state) => ({
    ...base,
    color: "white",
  }),
  singleValue: (base, state) => ({
    ...base,
    color: "white",
  }),
  option: (base, state) => ({
    ...base,
    background: "#3d3850",
  }),
};

export default colourStyles;
