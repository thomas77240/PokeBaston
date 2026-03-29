import type { ElementType, ComponentPropsWithoutRef, ReactNode, CSSProperties } from 'react';
import { PokemonUtils } from '../../utils/pokemon.utils';

export interface CustomStyle extends CSSProperties {
    '--color-type'?: string;
}

type BaseProps<T extends ElementType> = {
    as?: T;
    pokemonType: string;
    children?: ReactNode;
};

type TypeColoredItemProps<T extends ElementType> = BaseProps<T> &
    Omit<ComponentPropsWithoutRef<T>, keyof BaseProps<T>>;

export const TypeColoredItem = <T extends ElementType = 'div'>({
    as,
    pokemonType,
    children,
    style,
    ...rest
}: TypeColoredItemProps<T>) => {

    const Component = as || 'div';

    const dynamicStyle: CustomStyle = {
        ...(style as CSSProperties),
        '--color-type': PokemonUtils.getPokemonColorVar(pokemonType),
    };

    return (
        <Component style={dynamicStyle} {...rest}>
            {children}
        </Component>
    );
};

export default TypeColoredItem