import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent implements OnInit {
  public route = 'accordion';
  panels = [
    {
      disabled: true,
      header: 'Lorem ipsum dolor sit',
      content: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi iste repellendus deserunt consectetur praesentium ab enim quia ratione reprehenderit? Animi ipsam possimus repudiandae nesciunt ut veniam quos incidunt ullam est! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi iste repellendus deserunt consectetur praesentium ab enim quia ratione reprehenderit? Animi ipsam possimus repudiandae nesciunt ut veniam quos incidunt ullam est! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi iste repellendus deserunt consectetur praesentium ab enim quia ratione reprehenderit? Animi ipsam possimus repudiandae nesciunt ut veniam quos incidunt ullam est!'
    },
    {
      disabled: false,
      header: 'Consectetur adpisicing',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis similique aspernatur soluta praesentium labore deleniti temporibus impedit in tempore consequatur. Amet corrupti mollitia possimus a veniam eos commodi vero enim?'
    },
    {
      disabled: false,
      header: 'Lorem ipsum dolor sit amet consectetur',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex magni quasi blanditiis dolorum necessitatibus ab sint, eos dicta beatae sit eligendi possimus tempora dignissimos dolores exercitationem enim quo asperiores perspiciatis.'
    },
    {
      disabled: false,
      header: 'dolor sit amet consectetur adipisicing elit',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit doloribus dicta perferendis nisi aliquid minus consequuntur a, debitis incidunt eaque eum sequi nihil illo ut ab labore aut odio. Exercitationem.'
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
