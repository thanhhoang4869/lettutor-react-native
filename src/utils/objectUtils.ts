const isNotEmpty = (obj: object): boolean => {
  return Object.keys(obj).length > 0;
};

const cleanObject = (obj: object): object => {
  const newObj = {...obj};
  Object.fromEntries(
    Object.entries(newObj).filter(
      ([_, value]) => value !== undefined && value != null,
    ),
  );

  return newObj;
};

const objectUtils = {
  isNotEmpty,
  cleanObject,
};

export default objectUtils;
