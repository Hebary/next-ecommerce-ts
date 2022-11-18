export * from './Cart'

export const currencyParser = (number: number): string => {
    return number.toLocaleString('es-AR', {
      style: 'currency',
      currency: 'ARS',
    });
  }