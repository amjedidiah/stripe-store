import { objectifyArray, reverseObject } from "./array.util";

describe("Array util", () => {
  const arr = [
    { id: 1, name: "John" },
    { id: 2, name: "Jane" },
    { id: 3, name: "Jack" },
  ];
  const obj = {
    1: { id: 1, name: "John" },
    2: { id: 2, name: "Jane" },
    3: { id: 3, name: "Jack" },
  };

  describe("objectifyArray", () => {
    it("should return an object with the array items as values", () => {
      const result = objectifyArray(arr);

      expect(result).toEqual(obj);
    });

    it("should return an object with the array items as values with a custom determinant", () => {
      const expectedObj = {
        John: { id: 1, name: "John" },
        Jane: { id: 2, name: "Jane" },
        Jack: { id: 3, name: "Jack" },
      };
      const result = objectifyArray(arr, "name");

      expect(result).toEqual(expectedObj);
    });
  });

  describe("reverseObject", () => {
    it("should return an array with the object values as items", () => {
      const result = reverseObject(obj);
      expect(result).toEqual(arr);
    });
  });
});
