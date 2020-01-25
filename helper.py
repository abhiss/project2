import shutil
import os

basedir = os.getcwd()
destpubdir = basedir + '/built/public/'
srcpubdir = basedir + '/src/public/'

if os.path.isdir(destpubdir):
    shutil.rmtree(destpubdir)
    shutil.rmtree(basedir+'/built/config/')
    shutil.rmtree(basedir+'/built/models/')

else:
    os.makedirs(basedir+'/built')
    print("had to make dir /built")

shutil.copytree(srcpubdir, destpubdir)
shutil.copytree(basedir+'/src/config/', basedir+'/built/config/')
shutil.copytree(basedir+'/src/models/', basedir+'/built/models/')

for rootdir, dirs, files in os.walk(destpubdir):
    for file in files:
        filepath = os.path.join(rootdir, file)
        #filepath = rootdir + os.sep + file
        if filepath.endswith(".ts"):
            print(filepath)
            os.remove(filepath)

for rootdir, dirs, files in os.walk(basedir+'/built/models/'):
    for file in files:
        filepath = os.path.join(rootdir, file)
        #filepath = rootdir + os.sep + file
        if filepath.endswith(".ts"):
            print(filepath)
            os.remove(filepath)
