/*! For license information please see showcase.js.LICENSE.txt */
      mutation tagUpdate($modelId: ID! ${n}) {
        ${r}
      }
    `;return this.mutate(o,s).then((()=>{}))}async delete(e){if(!e||0===e.length)return;const t=this.getViewId();let i="";for(const t of e){if(!t||t&&!t.sid)throw new Error("MattertagStore.delete failed");i+=`delete${t.sid}: deleteMattertag(modelId: $modelId, mattertagId: "${t.sid}") `}const n=D.Ps`
      mutation batchDeleteMattertag($modelId: ID!) {
        ${i}
      }
      mutation sweepUpdate($modelId: ID! ${i}) {
        ${s}
      }