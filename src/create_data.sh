#!/bin/sh

IMGDIR='../docs/images'

classes=`ls ${IMGDIR}`

echo '{'
cat <<EOF
    "translate": {
        "fineart": "Fine-Art",
        "wedding": "Casamento",
        "portrait": "Ensaio",
        "graduation": "Formatura"
    },
EOF
c1=0
for c in ${classes}
do
    [ "${c}" == "icons" ] && continue
    files=`ls ${IMGDIR}/${c}/*.jpg 2>/dev/null` || continue
    base="`basename ${IMGDIR}`/${c}"
    [ $c1 -eq 1 ] && echo ',' || c1=1
    echo -en '    "'$c'":['
    c2=0
    for f in ${files}
    do
        [ $c2 -eq 1 ] && echo -n ',' || c2=1
        echo -en "\n        "'"'${base}/`basename ${f}`'"'
    done
    echo -en '\n    ]'
done
echo -e '\n}'
