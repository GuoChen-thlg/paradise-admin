/*
 * @Author: 天火流光
 * @Date: 2022-02-27 17:22:36
 * @LastEditTime: 2022-03-05 17:20:43
 * @LastEditors: 天火流光
 * @Description: 正则
 * @FilePath: \paradise-admin\src\utils\regexp.ts
 *
 */
export const regMargin = /^(margin|padding)-(top|right|bottom|left)$/

export const regCssUnits = /(?<units>px|rem|em|%|deg|vh|vw|vmin|vmax)$/

export const regCssVal = /^(-?(0|[1-9]){1,}(\.\d+)*?(px|rem|em|%|deg|vh|vw|vmin|vmax){1}|(auto))$/
