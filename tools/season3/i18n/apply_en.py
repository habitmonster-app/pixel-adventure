# 시즌 3 영어 번역을 game/index.html에 넣어요 (여러 번 돌려도 같은 결과)
# 사용: python3 tools/season3/i18n/apply_en.py
import json,os,re,sys
H=os.path.dirname(os.path.abspath(__file__))
G=sys.argv[1] if len(sys.argv)>1 else os.path.join(H,'..','..','..','game','index.html')
D=json.load(open(os.path.join(H,'s3_en.json'),encoding='utf8'))
TP=json.load(open(os.path.join(H,'s3_en_patterns.json'),encoding='utf8'))
s=open(G,encoding='utf8').read()
TA=[x for x in TP if x[0].startswith('([^:')];TP=[x for x in TP if x not in TA]
line='/*S3EN*/Object.assign(window.I18N_EN,'+json.dumps(D,ensure_ascii=False,separators=(',',':'))+');window.I18N_EN_T='+json.dumps(TP,ensure_ascii=False,separators=(',',':'))+'.concat(window.I18N_EN_T||[]).concat('+json.dumps(TA,ensure_ascii=False,separators=(',',':'))+');\n'
L=s.split('\n')
L=[l for l in L if not l.startswith('/*S3EN*/')]
i=next(k for k,l in enumerate(L) if l.startswith('/*S2EN*/'))
L.insert(i+1,line.rstrip('\n'))
open(G,'w',encoding='utf8').write('\n'.join(L))
print('entries',len(D),'patterns',len(TP))
