const nodes = document.querySelectorAll('.map-node');
const cards = document.querySelectorAll('.project-card');
const captions = {all:'选择节点，筛选相关的工程案例。',parallel:'Sequence Parallelism：关注张量与 token 的分布式协作。',runtime:'Stage Runtime：关注请求如何跨阶段运行与控制。',batching:'Continuous Batching：关注 step 粒度的调度能力。',models:'Model Integration：让模型能力进入统一服务运行时。',validation:'Validation：以测试、profiling 与 benchmark 验证结论。'};
nodes.forEach(node => node.addEventListener('click', () => {
  const filter = node.dataset.filter;
  nodes.forEach(n => n.classList.toggle('active', n === node));
  document.querySelector('#map-caption').textContent = captions[filter];
  cards.forEach(card => { const show = filter === 'all' || card.dataset.tags.includes(filter); card.style.opacity = show ? '1' : '.22'; card.style.transform = show ? '' : 'scale(.985)'; });
  document.querySelector('#work').scrollIntoView({behavior:'smooth', block:'start'});
}));

const slider = document.querySelector('#shards');
if (slider) {
  const tokens = document.querySelector('#tokens'); const ranks = document.querySelector('#ranks'); const out = document.querySelector('#shard-output'); const copy = document.querySelector('#mode-copy'); let mode = 'ulysses';
  function draw(){ const n = +slider.value; out.textContent = n; tokens.innerHTML = Array.from({length:16},(_,i)=>`<i class="token" title="token ${i+1}"></i>`).join(''); ranks.innerHTML = Array.from({length:n},(_,i)=>`<div class="rank"><span>RANK ${i}</span><i style="--f:${mode==='hybrid' ? (i%2+1) : 1}"></i></div>`).join(''); const text={ulysses:'按 token 维度切分，rank 间协作完成 attention。',ring:'把序列段分配给各 rank，以环形通信完成跨段注意力。',hybrid:'先按 Ulysses 分组，再以 Ring 连接分组中的序列段。'}; copy.textContent=text[mode]; }
  slider.addEventListener('input',draw); document.querySelectorAll('.segmented button').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.segmented button').forEach(b=>b.classList.toggle('selected',b===btn));mode=btn.dataset.mode;draw()})); draw();
}
