type StyledBranchObject<T extends string> = Record<T, string>;

export default function styledBranchOfAType<T extends string>(
  prop: T,
  branch: StyledBranchObject<T>,
) {
  return branch[prop];
}
