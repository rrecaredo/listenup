export default (s: string) =>
    s.replace(/([-_][a-z])/ig, ($1) => 
    $1.toUpperCase()
        .replace('-', '')
        .replace('_', ''))
      .replace(/_/g, '');
