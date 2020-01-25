import sys
print(sys.argv[1])
fn = sys.argv[1]
if(fn == "prod"):
    with open('./.gitignore', 'tw') as f:
        f.write(".DS_Store\nnode_modules\nnpm-debug.log\n.env\n.vscode\n*.ogg\nbuilt\n")

elif(fn == "dev"):
    with open('./.gitignore', 'tw') as f:
        f.write(".DS_Store\nnode_modules\nnpm-debug.log\n.env\n.vscode\n*.ogg\n")

    
