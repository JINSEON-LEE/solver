/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createProblem = /* GraphQL */ `
  mutation CreateProblem(
    $input: CreateProblemInput!
    $condition: ModelProblemConditionInput
  ) {
    createProblem(input: $input, condition: $condition) {
      id
      subject
      user
      name
      regist
      deadline
      description
      image
      solved
      createdAt
      updatedAt
    }
  }
`;
export const updateProblem = /* GraphQL */ `
  mutation UpdateProblem(
    $input: UpdateProblemInput!
    $condition: ModelProblemConditionInput
  ) {
    updateProblem(input: $input, condition: $condition) {
      id
      subject
      user
      name
      regist
      deadline
      description
      image
      solved
      createdAt
      updatedAt
    }
  }
`;
export const deleteProblem = /* GraphQL */ `
  mutation DeleteProblem(
    $input: DeleteProblemInput!
    $condition: ModelProblemConditionInput
  ) {
    deleteProblem(input: $input, condition: $condition) {
      id
      subject
      user
      name
      regist
      deadline
      description
      image
      solved
      createdAt
      updatedAt
    }
  }
`;
