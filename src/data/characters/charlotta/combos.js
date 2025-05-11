const charlottaCombos = [
  {
    combo: "c5XXX > [4]6X",
    position: "Anywhere",
    meterGain: "",
    worksOn: "All",
    difficulty: "Very Easy",
    notes: "Hold 4 during autocombo to charge for [4]6X."
  },
  {
    combo: "c5XXX > [2]8X",
    position: "Anywhere",
    meterGain: "",
    worksOn: "All",
    difficulty: "Very Easy",
    notes: "Use shortcut if you forgot to charge."
  },
  {
    combo: '<span class="colorful-text-2">2U</span> > <span class="colorful-text-4">214H</span>',
    position: "Anywhere",
    meterGain: "",
    worksOn: "All",
    difficulty: "Very Easy",
    notes: "Cheeky sweep confirm that leaves you +4 if blocked and gives hard KD if it connects."
  },
  {
    combo: "f5X > [4]6X",
    position: "Anywhere",
    meterGain: "",
    worksOn: "All",
    difficulty: "Easy",
    notes: "Far 1-button confirm. Use shortcut if no time to charge for [4]6X."
  },
  {
    combo: "2X > [4]6X",
    position: "Anywhere",
    meterGain: "",
    worksOn: "All",
    difficulty: "Easy",
    notes: "Same as above for crouch buttons."
  },
  {
    combo: '<span class="colorful-text-1">2L</span>, <span class="colorful-text-1">2L</span>, <span class="colorful-text-1">f5L</span> > [4]6X',
    position: "Anywhere",
    meterGain: "",
    worksOn: "All",
    difficulty: "Easy",
    notes: '<span class="colorful-text-1">2L</span> hitconfirm string. End at <span class="colorful-text-1">f5L</span> if blocked. Can use shortcut to avoid having to charge. [4]6X X can be <span class="colorful-text-1">L</span> or <span class="colorful-text-4">H</span>, <span class="colorful-text-3">M</span> often doesn\'t link.'
  },
  {
    combo: '<span class="colorful-text-1">c5L</span>/<span class="colorful-text-1">2L</span>, <span class="colorful-text-3">c5MM</span> > <span class="colorful-text-4">214H</span>, <span class="colorful-text-3">f5M</span> > [4]6X',
    position: "Anywhere",
    meterGain: "",
    worksOn: "All",
    difficulty: "Medium",
    notes: 'BnB <span class="colorful-text-1">c5L</span>/<span class="colorful-text-1">2L</span> hitconfirm string. [4]6X can be <span class="colorful-text-1">L</span> or <span class="colorful-text-4">H</span>. Replace <span class="colorful-text-3">f5M</span> with <span class="colorful-text-1">f5L</span> vs. wifi opponents.'
  },
  {
    combo: 'CH <span class="colorful-text-3">2M</span>, <span class="colorful-text-1">f5L</span> > [4]6X',
    position: "Counterhit",
    meterGain: "",
    worksOn: "All",
    difficulty: "Medium",
    notes: '[4]6X can be <span class="colorful-text-1">L</span> or <span class="colorful-text-4">H</span>. Use shortcut if no time to charge for [4]6X.'
  },
  {
    combo: 'CH <span class="colorful-text-4">c5H</span>, c5HX > <span class="colorful-text-4">214H</span>, <span class="colorful-text-3">f5M</span> > [4]6X',
    position: "Counterhit",
    meterGain: "",
    worksOn: "All",
    difficulty: "Easy",
    notes: '[4]6X can be <span class="colorful-text-1">L</span> or <span class="colorful-text-4">H</span>.'
  },
  {
    combo: 'CH <span class="colorful-text-4">f5H</span>, <span class="colorful-text-3">f5M</span> > [4]6X',
    position: "Counterhit",
    meterGain: "",
    worksOn: "All",
    difficulty: "Easy",
    notes: '[4]6X can be <span class="colorful-text-1">L</span> or <span class="colorful-text-4">H</span>.'
  },
  {
    combo: 'c5(XX) > <span class="colorful-text-3">214M</span>, <span class="colorful-text-1">f5L</span> > [4]6X',
    position: "Crouching Hit",
    meterGain: "",
    worksOn: "All",
    difficulty: "Medium",
    notes: 'Preserves <span class="colorful-text-4">214H</span> cooldown. [4]6X can be <span class="colorful-text-1">L</span> or <span class="colorful-text-4">H</span>.'
  },
  {
    combo: 'c5(XX) > <span class="colorful-text-4">214H</span>, <span class="colorful-text-2">2U</span>',
    position: "Crouching Hit",
    meterGain: "",
    worksOn: "All",
    difficulty: "Easy",
    notes: 'Hard KD, preserves <span class="colorful-text-4">[4]6H</span> cooldown.'
  },
  {
    combo: 'c5(XX) > <span class="colorful-text-4">214H</span>, <span class="colorful-text-3">f5M</span> > <span class="colorful-text-4">[4]6H</span> > run forward > <span class="colorful-text-2">2U</span>',
    position: "Near Corner",
    meterGain: "",
    worksOn: "All",
    difficulty: "Medium",
    notes: "Works slightly outside of corner."
  },
  {
    combo: 'c5(XX) > <span class="colorful-text-4">214H</span>, <span class="colorful-text-3">f5M</span> > <span class="colorful-text-4">[4]6H</span>, c5MXX > [2]8X',
    position: "Corner",
    meterGain: "",
    worksOn: "All",
    difficulty: "Medium",
    notes: "hits of autocombo at end to give enough time to charge for [2]8X."
  },
  {
    combo: 'c5(XX) > <span class="colorful-text-4">[4]6H</span>, <span class="colorful-text-3">c5MM</span> > <span class="colorful-text-4">214H</span>, <span class="colorful-text-2">2U</span>',
    position: "Corner",
    meterGain: "",
    worksOn: "All",
    difficulty: "Medium",
    notes: "Sweep ender into dl. 22L for meaty demonflip with + on block slide"
  },
  {
    combo: 'c5(XX) > <span class="colorful-text-4">[4]6H</span>, <span class="colorful-text-3">c5MM</span> > <span class="colorful-text-3">214M</span>, <span class="colorful-text-1">f5L</span> > <span class="colorful-text-4">236236H</span>',
    position: "Corner",
    meterGain: "",
    worksOn: "All",
    difficulty: "Hard",
    notes: 'Alternate route to have <span class="colorful-text-4">[4]6H</span> cooldown available sooner and avoid using <span class="colorful-text-4">214H</span> cooldown.'
  },
  {
    combo: 'c5(XX) > <span class="colorful-text-4">214H</span>, <span class="colorful-text-4">c5H</span> > <span class="colorful-text-4">[4]6H</span>, c5MXX > [2]8X',
    position: "Corner Crouching Hit",
    meterGain: "",
    worksOn: "All",
    difficulty: "Hard",
    notes: 'Optimal route on crouch. Can replace c5MXX > [2]8X for <span class="colorful-text-3">c5M</span> > <span class="colorful-text-4">236236H</span>/<span class="colorful-text-2">U</span> if SBA/SSBA available.'
  },
  {
    combo: 'CH <span class="colorful-text-3">[4]6M</span>, <span class="colorful-text-4">c5H</span> > <span class="colorful-text-4">[4]6H</span>, c5HXX > [2]8X',
    position: "Corner Counterhit",
    meterGain: "",
    worksOn: "All",
    difficulty: "Medium",
    notes: 'Can replace c5HXX > [2]8X for <span class="colorful-text-4">c5H</span> > <span class="colorful-text-4">236236H</span>/<span class="colorful-text-2">U</span> if SBA/SSBA available.'
  },
  {
    combo: '<span class="colorful-text-4">22H</span>~low, <span class="colorful-text-3">c5M</span> > <span class="colorful-text-4">[4]6H</span>, c5MXX > [2]8X',
    position: "Corner",
    meterGain: "",
    worksOn: "who",
    difficulty: "Medium",
    notes: 'Can replace c5MX > [2]8X for <span class="colorful-text-3">c5M</span> > <span class="colorful-text-4">236236H</span>/<span class="colorful-text-2">U</span> if SBA/SSBA available.'
  },
  {
    combo: '<span class="colorful-text-4">22H</span>~<span class="colorful-text-4">H</span>, <span class="colorful-text-3">c5M</span> > <span class="colorful-text-4">214H</span>, c5HXX > [2]8X',
    position: "Corner",
    meterGain: "",
    worksOn: "who",
    difficulty: "Medium",
    notes: "Use when you don't have or want to save [4]6X cooldown."
  },
  {
    combo: '<span class="colorful-text-4">22H</span>~<span class="colorful-text-4">H</span>, <span class="colorful-text-4">c5H</span> > <span class="colorful-text-4">[4]6H</span>, c5HXX > [2]8X',
    position: "Corner",
    meterGain: "",
    worksOn: "who",
    difficulty: "Hard",
    notes: 'Command grab must connect close to ground for first <span class="colorful-text-4">c5H</span> to link. Can replace c5HX > [2]8X for <span class="colorful-text-3">c5M</span> > <span class="colorful-text-4">236236H</span>/<span class="colorful-text-2">U</span> if SBA/SSBA available.'
  },
  {
    combo: '<span class="colorful-text-4">22H</span>~<span class="colorful-text-4">H</span>, <span class="colorful-text-4">c5H</span> > <span class="colorful-text-4">[4]6H</span>, <span class="colorful-text-3">c5M</span> > <span class="colorful-text-4">214H</span>, <span class="colorful-text-2">2U</span>',
    position: "Corner",
    meterGain: "",
    worksOn: "who",
    difficulty: "Very Hard",
    notes: 'Command grab must connect close to ground for first <span class="colorful-text-4">c5H</span> to link. Slight delay before <span class="colorful-text-3">c5M</span>'
  },
  {
    combo: '<span class="colorful-text-4">c5H</span>/<span class="colorful-text-4">2H</span> > [2]8X',
    position: "Antiair",
    meterGain: "",
    worksOn: "who",
    difficulty: "Very Easy",
    notes: "Basic Antiair combo"
  },
  {
    combo: 'CH <span class="colorful-text-4">c5H</span>/<span class="colorful-text-4">2H</span> > <span class="colorful-text-1">[4]6L</span>(whiff), <span class="colorful-text-3">c5MM</span> > [2]8X',
    position: "Counterhit Antiair",
    meterGain: "",
    worksOn: "who",
    difficulty: "Easy",
    notes: "Basic CH antiair confirm."
  },
  {
    combo: 'CH <span class="colorful-text-2">jU</span>, <span class="colorful-text-2">2U</span>',
    position: "Counterhit Antiair",
    meterGain: "",
    worksOn: "who",
    difficulty: "Easy",
    notes: 'May have to run forward to connect <span class="colorful-text-2">2U</span>. Gives hard KD.'
  },
  {
    combo: 'CH <span class="colorful-text-2">jU</span>, <span class="colorful-text-3">c5MM</span> > [4]6X',
    position: "Counterhit Antiair",
    meterGain: "",
    worksOn: "who",
    difficulty: "Medium",
    notes: 'Better corner carry and gives hard KD if <span class="colorful-text-4">[4]6H</span> is used.'
  },
  {
    combo: 'CH <span class="colorful-text-2">jU</span>, 2[8]X',
    position: "Counterhit Antiair",
    meterGain: "",
    worksOn: "who",
    difficulty: "Medium",
    notes: "Off forward jump air to air."
  },
  {
    combo: 'CH <span class="colorful-text-2">jU</span>, <span class="colorful-text-2">jU</span> > <span class="colorful-text-2">236236U</span>',
    position: "Antiair Near Corner",
    meterGain: "",
    worksOn: "who",
    difficulty: "Very Hard",
    notes: 'Off forward jump air to air. Extremely dependent on how late first <span class="colorful-text-2">jU</span> connects. This will never work IRL.'
  },
  {
    combo: 'CH <span class="colorful-text-4">c5H</span>/<span class="colorful-text-4">2H</span> > <span class="colorful-text-4">22H</span>~<span class="colorful-text-1">L</span>, <span class="colorful-text-3">c5M</span> > <span class="colorful-text-4">[4]6H</span>',
    position: "Counterhit Antiair",
    meterGain: "",
    worksOn: "who",
    difficulty: "Very Hard",
    notes: 'Can replace <span class="colorful-text-4">[4]6H</span> with <span class="colorful-text-4">236236H</span>/<span class="colorful-text-2">U</span> if SBA/SSBA available.'
  }
];

export default charlottaCombos;
