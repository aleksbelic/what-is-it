export default function AbbrCounterComponent({abbrCount}) {
  return (
    <small>
      <i>
        {abbrCount}&nbsp;{abbrCount !== 1 ? 'matches' : 'match'}
      </i>
    </small>
  );
}
