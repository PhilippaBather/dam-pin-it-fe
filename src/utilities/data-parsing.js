export const stripQueryParam = (id, type) => {
  if (type == "USER_ID") {
    return id.slice(3);
  }
};
