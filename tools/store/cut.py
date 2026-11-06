import json,subprocess,sys
kind=sys.argv[1];J=json.load(open(f'vid/{kind}_cuts.json'));c=dict(J['cuts'])
segs=[(c[n],c[n+'_end']) for n in ['title','sel','hunt','skill','enh','map','boss','end']]
f=''.join(f"[0:v]trim={a:.3f}:{b:.3f},setpts=PTS-STARTPTS,fps=30[v{i}];" for i,(a,b) in enumerate(segs))
f+=''.join(f"[v{i}]" for i in range(len(segs)))+f"concat=n={len(segs)}:v=1:a=0,format=yuv420p[v]"
out=f'vid/bongin_{kind}.mp4'
subprocess.run(['ffmpeg','-y','-loglevel','error','-i',J['video'],'-f','lavfi','-i','anullsrc=r=44100:cl=stereo','-filter_complex',f,'-map','[v]','-map','1:a','-shortest','-c:v','libx264','-profile:v','high','-crf','18','-preset','slow','-r','30','-c:a','aac','-b:a','128k','-movflags','+faststart',out],check=True)
print(out,sum(b-a for a,b in segs))
