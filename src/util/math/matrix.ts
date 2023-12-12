export const rotateMatrix = (matrix: any[][], rotateBy: number): any[][] => {
  if (rotateBy > 0) {
    let newMatrix: any[][] = [];

    // Rotate matrix by 90 degrees clockwise
    for (let i = 0; i < matrix[0].length; i++) {
      let newRow: any[] = [];
      for (let j = matrix.length - 1; j >= 0; j--) {
        newRow.push(matrix[j][i]);
      }
      newMatrix.push(newRow);
    }

    return rotateMatrix(newMatrix, rotateBy - 1);
  } else {
    return matrix;
  }
};
