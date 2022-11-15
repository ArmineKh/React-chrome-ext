type StylesType = Record<string, string>
export interface DataType {
  cssText: string
  ruleName: string
  style: StylesType
}
export interface SnapElementPropsType { data: DataType | null, copySuccess: boolean }
