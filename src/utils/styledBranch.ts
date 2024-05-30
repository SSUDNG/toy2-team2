import { RuleSet } from 'styled-components';

type StyledBranchObject<T extends string> = Record<T, RuleSet<object>>;

export default function styledBranchOfAType<T extends string>(
  prop: T,
  branch: StyledBranchObject<T>,
) {
  return branch[prop];
}
