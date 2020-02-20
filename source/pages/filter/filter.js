import './filter.styl';
import PosControl from '../../scripts/PosControl';
import StayPeriodControl from '../../scripts/StayPeriodControl';
import StayPeriodControlToggle from '../../scripts/StayPeriodControlToggle';
import PriceRangeControl from '../../scripts/PriceRangeControl';
import ImageSlider from '../../scripts/ImageSlider';
import BlockScrollToggle from "../../scripts/BlockScrollToggle"

new PosControl('filter-guests-control');
new StayPeriodControl('filter-list-stay-period-control');
new StayPeriodControlToggle('filter-list-stay-period-control', 300);
new PriceRangeControl('price-range-control', 0, 15000);
new PosControl('filter-facilities-control');
new ImageSlider('card-wrapper');
new BlockScrollToggle('menu-toggle');
