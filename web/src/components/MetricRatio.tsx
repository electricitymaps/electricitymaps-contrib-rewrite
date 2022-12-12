export function MetricRatio({ value, total, format }) {
  return (
    <small>{`(${Number.isFinite(value) ? format(value) : '?'} / ${
      Number.isFinite(total) ? format(total) : '?'
    })`}</small>
  );
}
