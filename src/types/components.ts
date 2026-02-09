export interface Component {
  cleanup?: () => void;
}

export interface GridItemComponent extends Component, HTMLDivElement {}
export interface MoleComponent extends Component, HTMLImageElement {}
