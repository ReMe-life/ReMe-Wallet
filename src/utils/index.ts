export function formatAmount (amount: string, fraction = 4): string {
    const formattedAmount = amount.padStart(19, '0')
    const fractionPart = formattedAmount.substr(formattedAmount.length - 18).substr(0, fraction)
    const intPart = formattedAmount.substr(0, formattedAmount.length - 18)

    return `${intPart}.${fractionPart}`
}
